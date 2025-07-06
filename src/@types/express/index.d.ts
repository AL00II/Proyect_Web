import { JwtPayload } from 'src/modules/users/domain/types/jwt-payload.type';

declare module 'express' {
  interface Request {
    user: JwtPayload;
  }
}