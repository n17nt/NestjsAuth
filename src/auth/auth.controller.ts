import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { AuthGuard } from './auth.guard';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('register')
  // create(@Body() loginDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() req: any) {
    console.log(loginDto, '--contr');

    return this.authService.login(loginDto);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  getMyData(@Req() req: any) {
    return req.user;
  }
}
