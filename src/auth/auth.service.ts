import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string): Promise<{ accessToken: string }> {
    if (username !== 'jessica') {
      throw new UnauthorizedException('Invalid username');
    }

    const user = { id: 1, username: 'Jessica' };
    const accessToken = this.jwtService.sign(user);

    return { accessToken };
  }
}
