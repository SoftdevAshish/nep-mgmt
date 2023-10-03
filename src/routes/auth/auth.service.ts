import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserParams } from './types';
import { genPassword } from '../../utils/genpass';
import { MailService } from '../mail/mail.service';
import { EmailService } from '../mail/email.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepo') private userRepository: Repository<User>,
    private mailService: MailService,
    private emailService: EmailService,
  ) {}

  login() {
    return 'Login';
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
        const ctx = { name: creatUser.name, password: genPass };
        // await this.emailService.sendMail(
        //   creatUser.email,
        //   'Test Password',
        //   `Password:${genPass}`,
        // );

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
}
