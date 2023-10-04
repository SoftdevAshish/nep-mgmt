import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import * as bcrypt from 'bcrypt';

export const genPassword = () => {
  const randomString = randomStringGenerator();
  return randomString;
};

export const isMatchedPassword = (userPass, hashPass) =>
  bcrypt.compare(userPass, hashPass);
