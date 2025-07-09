import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  generate(payload: { sub: string; email: string; role: string }){
    return this.jwtService.sign(payload);
  }
}