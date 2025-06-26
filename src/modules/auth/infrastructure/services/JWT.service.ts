import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  generate(payload: { sub: string; username: string }) {
    return this.jwtService.sign(payload);
  }
}
