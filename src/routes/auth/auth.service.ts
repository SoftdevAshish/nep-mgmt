import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserParams } from './types';
import { genPassword } from '../../utils/genpass';

@Injectable()
export class AuthService {
  constructor(@Inject('UserRepo') private userRepository: Repository<User>) {}

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
      return this.userRepository.save(this.userRepository.create(data));
      return { users, data };
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
