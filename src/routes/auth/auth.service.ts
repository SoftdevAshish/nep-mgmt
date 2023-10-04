import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserParams, loginUserParams } from './types';
import { MailService } from '../mail/mail.service';
import { EmailService } from '../mail/email.service';
import { genPassword } from '../../utils/passwordHash';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepo') private userRepository: Repository<User>,
    private mailService: MailService,
    private emailService: EmailService,
  ) {}

  async login(loginDetils: loginUserParams) {
    let user = {};
    const { email, phone, password } = loginDetils;
    if (!email && !phone) {
      throw new HttpException('Check Your Email And Phone', 403);
    }
    if (email && password) {
      user = await this.checkUser({ email }, password);
      console.log('Email');
    }
    if (phone && password) {
      user = await this.checkUser({ phone }, password);
      console.log('Phone');
    }
    return user;
  }

  async register(userDetails: CreateUserParams) {
    try {
      const genPass = genPassword();
      console.log(genPass);
      const users = await this.findByEmailOrPhone(
        userDetails.email,
        userDetails.phone,
      );
      if (users.isDuplicate) {
        throw new HttpException('Please Enter Unique Email and Phone', 409);
      }
      const data = { ...userDetails, password: genPass };

      const creatUser = await this.userRepository.save(
        this.userRepository.create(data),
      );
      if (Object.keys(creatUser).length > 1) {
        const ctx = {
          name: creatUser.name,
          email: creatUser.email,
          phone: creatUser.phone,
          password: genPass,
        };
        // await this.emailService.sendMail(
        //   creatUser.email,
        //   'Test Password',
        //   `Password:${genPass}`,
        // );
        await this.emailService.sendMail(
          creatUser.email,
          'Account Created',
          ctx,
        );
        await this.mailService.registerMail(creatUser.email, ctx);
      }
      return creatUser;
    } catch (e) {
      throw e;
    }
  }

  async findByEmailOrPhone(email: string, phone: string) {
    let isDuplicate = false;
    try {
      const details = await this.userRepository.find({
        where: [{ email }, { phone }],
      });
      if (details.length > 0) {
        isDuplicate = true;
      } else {
        isDuplicate = false;
      }
      return { details, isDuplicate };
    } catch (e) {
      throw e;
    }
  }

  async checkUser(username: any, password: string) {
    // let loginStatus;
    try {
      const user = await this.userRepository.findOne({
        where: [{ ...username }],
      });
      if (user) {
        const isMatched = await bcrypt.compare(password, user.password);
        if (isMatched) {
          return user;
          //   } else {
          //     throw new HttpException("Sorry Credential Not Match", 403);
          //   }
          // } else {
          //   throw new HttpException("Sorry Credential Not Match", 403);
        }
      }
    } catch (e) {
      throw e;
    }
    // return loginStatus;
  }
}
