import { RpcException } from '@nestjs/microservices';

export const BadRequest = (message: string) => {
  throw new RpcException({
    message: message,
    httpCode: 400,
  });
};

export const NotFound = (param: string) => {
  throw new RpcException({
    message: `${param} not found`,
    httpCode: 404,
  });
};

export const Unauthorized = (message: string) => {
  throw new RpcException({
    message: `Unauthorized: ${message}`,
    httpCode: 401,
  });
};
