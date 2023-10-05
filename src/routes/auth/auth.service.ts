import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import { errorMessage, successMessage } from '../../utils/responses';
import { RoleEntity } from '../role/entities/role.entity';
import { Role } from '../../config/enums';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginUserDto } from './dto/loginUserDto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {UuidEntity} from "./entities/uuid.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UuidEntity)
    private readonly uuidRepository: Repository<UuidEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private jwtService: JwtService,
  ) {}

  //create User
  async createUser(createUserDto: CreateUserDto) {
    return this.createNewUserFn(createUserDto, 'User created', true);
  }

  /**
   *
   * @param id
   */
  async returnUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['roles'],
    });

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return user;
  }

  async createNewUserFn(
    createUserDto: CreateUserDto,
    message: string,
    isActive: true,
  ) {
    const { name, email, phone, role } = createUserDto;

    if (!phone) {
      errorMessage('Please enter contact number', 'contactNumber');
    }

    if (!name) {
      errorMessage('Please enter username', 'username');
    }

    if (!email) {
      errorMessage('Please enter email', 'email');
    }

    const password = this.generatePassword(phone, name);

    const gotUserQuery = await getRepository(User)
      .createQueryBuilder('users')
      .where('users.name = :name', { name })
      .orWhere('users.email = :email', { email })
      .orWhere('users.phone = :phone', { phone });

    const gotUser = await gotUserQuery.getOne();

    if (gotUser) {
      if (gotUser.name == name)
        errorMessage('User exists with same information', 'username');
      if (gotUser.email == email)
        errorMessage('User exists with same information', 'email');
      if (gotUser.phone == phone)
        errorMessage('User exists with same information', 'contactNumber');
    }

    const reemail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const emailSatisfy = reemail.test(email);

    if (!emailSatisfy) {
      return errorMessage('Invalid email id', 'email');
    }

    let roles: RoleEntity[] = [];
    if (role) {
      for (const r of role) {
        const gotRole = await this.roleRepository.findOneOrFail({
          where: { id: r },
        });
        roles.push(gotRole);
      }
    }

    const roleName = roles.map((x) => x.name);

    if (roles.length > 1) {
      if (roleName.includes(Role.agent)) {
        errorMessage(
          'User containing agent as a role can not have multiple roles',
          'roleId',
        );
      }
    }
    let savedUser;

    let hashedPassword;
    if (password) {
      try {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
      } catch (e) {
        throw e;
      }
    }

    const newUser = new User();

    //Checking if roles contain super admin and super admin user already in database
    const mappedRoles = roles.map((x) => x.name);
    if (mappedRoles.includes(Role.superAdmin)) {
      const gotUserQuery = await getRepository(User)
        .createQueryBuilder('users')
        .leftJoinAndSelect('role', 'role')
        .where('role.name = :sRole', { sRole: Role.superAdmin });
      const gotUserWithRoles = await gotUserQuery.getMany();

      if (gotUserWithRoles.length > 0) {
        errorMessage(
          'Super admin already exists,there can be only one super admin',
          'role',
        );
      }
    }

    newUser.name = name;
    newUser.phone = phone;
    newUser.password = hashedPassword;
    newUser.email = email;
    newUser.roles = roles;

    savedUser = await this.userRepository.save(newUser);

    return successMessage(message, await this.buildUserRO(savedUser));
  }

  async compareUser(loginUserDto: LoginUserDto) {
    const { phone, password } = loginUserDto;

    const gotUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.phone  = :phone', { phone })
      .addSelect('user.password')
      .getOne();

    if (!gotUser) return null;

    const match = await bcrypt.compare(password, gotUser.password);

    if (!match) {
      errorMessage('Password does not match', 'password', 403);
      return null;
    } else {
      return gotUser;
    }
  }

  // Function to generate JWT
  public async generateJWT(user) {
    let payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };

    if (user.firstLogin) {
      const minutesToAdd = 10;
      const currentDate = new Date();
      const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

      const uuidData = uuidv4();
      const uuids = new UuidEntity();
      uuids.uuid = uuidData.toString();
      uuids.user = user;
      uuids.expiry = futureDate;
      uuids.active = true;

      await this.uuidRepository.save(uuids);
      payload['uuid'] = uuidData.toString();
    }
    return this.jwtService.sign(payload);
  }

  // #Building userJWT and All
  private async buildUserRO(user: User) {
    const userRO = {
      id: user.id,
      name: user.name,
      email: user.email,
      token: await this.generateJWT(user),
      role: user.roles,
    };

    return { user: userRO };
  }

  private generatePassword(contactNumber: string, username: string) {
    const date = new Date().toISOString();
    const password =
      username.trim()[0].toUpperCase() +
      '#' +
      username[1].toLowerCase() +
      '$' +
      contactNumber.trim().substring(1, 2) +
      date.trim().substring(0, 5);
    return password;
  }
}
