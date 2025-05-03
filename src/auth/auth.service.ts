import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(loginData: LoginDto) {
    console.log(loginData);
    const user = await this.userService.validateUser(
      loginData.username,
      loginData.password,
    );
    const token = await this.jwtService.sign({
      id: user.id,
      role: user.role,
      username: user.username,
    });
    const refreshToken = await this.jwtService.sign(
      {
        id: user.id,
        role: user.role,
        username: user.username,
      },
      { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' },
    );
    await this.userService.updateUser(user.id, { refreshToken: refreshToken });

    return { user, token };
  }
}
