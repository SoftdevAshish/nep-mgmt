import { HttpException, HttpStatus } from '@nestjs/common';

export const successMessage = ({
  message,
  data,
}: {
  message: string;
  data: any;
}) => {
  return { message, data };
};

export const errorMessage = ({
  reason,
  field,
  status,
}: {
  reason: string;
  field: string;
  status: any;
}) => {
  throw new HttpException(
    { reason, field },
    status || HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
