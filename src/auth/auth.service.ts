import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async create(data: any) {
    const user = await this.userService.create(data);
    return user;
  }
  async refresh(token: string) {
    const user = await this.userService.refresh(token);
    const access = await this.jwtService.signAsync({
      id: user.id,
      role: user.role,
      username: user.username,
    });
    return { user, access };
  }
  async login(loginData: LoginDto) {
    console.log(loginData);
    const user = await this.userService.validateUser(
      loginData.username,
      loginData.password,
    );
    const token = await this.jwtService.signAsync({
      id: user.id,
      role: user.role,
      username: user.username,
    });
    console.log(await this.jwtService.verifyAsync(token));

    const refreshToken = await this.jwtService.sign(
      {
        id: user.id,
        role: user.role,
        username: user.username,
      },
      { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' },
    );
    await this.userService.updateUser(user.id, { refreshToken: refreshToken });

    return { user, token, refreshToken };
  }
}
