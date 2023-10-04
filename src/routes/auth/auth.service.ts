import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserParams, loginUserParams } from './types';
import { MailService } from '../mail/mail.service';
import { EmailService } from '../mail/email.service';
import { genPassword } from '../../utils/passwordHash';
import * as bcrypt from 'bcrypt';
import { errorMessage, successMessage } from '../../utils/response';
import { Tokens } from './types/token.types';
import { JwtPayload } from './types/JwtPayload';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepo') private userRepository: Repository<User>,
    private mailService: MailService,
    private emailService: EmailService,
    private jwtService: JwtService,
    private configService: ConfigService,
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
      return successMessage({ message: 'Login Successful', data: user });
    }
    if (phone && password) {
      user = await this.checkUser({ phone }, password);
      console.log('Phone');
      return successMessage({ message: 'Login Successful', data: user });
    }
    return errorMessage({
      reason: 'Username And Password Not Matcherd',
      field: 'Check and Verify your Username And Password.',
      status: 404,
    });
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
    try {
      const user = await this.userRepository.findOne({
        where: [{ ...username }],
      });
      if (user) {
        const isMatched = await bcrypt.compare(password, user.password);
        if (isMatched) {
          const tokenGen = await this.getToken({
            userId: user.id,
            email: user.email,
            roles: user.role,
          });
          await this.updateHashRefresh(user.id, tokenGen.refresh_token);
          return { user, tokenGen };
        } else {
          return errorMessage({
            reason: 'Username And Password Not Matcherd',
            field: 'Check and Verify your Username And Password.',
            status: 404,
          });
        }
      } else {
        return errorMessage({
          reason: 'Username And Password Not Matcherd',
          field: 'Check and Verify your Username And Password.',
          status: 404,
        });
      }
    } catch (e) {
      throw e;
    }
  }

  async getToken({
    userId,
    roles,
    email,
  }: {
    userId: number;
    roles: string;
    email: string;
  }): Promise<Tokens> {
    const jwtPayload: JwtPayload = { sub: userId, roles, email: email };
    const [accressTocken, refreshToken] = [
      await this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('ACCESS_SECRET_KEY'),
        expiresIn: this.configService.get('ACCESS_SECRET_KEY_EXPIRE'),
      }),
      await this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('REFRESH_SECRET_KEY'),
        expiresIn: this.configService.get('REFRESH_SECRET_KEY_EXPIRE'),
      }),
    ];
    return { access_token: accressTocken, refresh_token: refreshToken };
  }

  async updateHashRefresh(userId: number, refreshToken: string) {
    await this.userRepository.update(
      { id: userId },
      { hashRt: await bcrypt.hash(refreshToken, 10) },
    );
  }
}
