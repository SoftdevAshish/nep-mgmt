import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

export const genPassword = () => {
  const randomString = randomStringGenerator();
  return randomString;
};
