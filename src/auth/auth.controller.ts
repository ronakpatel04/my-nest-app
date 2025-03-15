import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createResponse } from 'src/utils/response.util';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('signup')
  async signup(
    @Body()
    body: {
      email: string;
      password: string;
      roleName: string;
      name?: string;
    },
  ) {
    const user = await this.authService.signup(
      body.email,
      body.password,
      body.roleName,
    );
    return user;
  }

  @Public()
  @Post('signin')
  signin(@Body() dto: { email: string; password: string }) {
    return this.authService.signin(dto.email, dto.password);
  }
}
