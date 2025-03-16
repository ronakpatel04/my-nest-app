import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { SigninDto, SignupDto } from './dto/auth.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('signup')
  async signup(
    @Body()
    body: SignupDto,
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
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto.email, dto.password);
  }

  @Post('logout')
  @ApiBearerAuth('access-token')
  async logout(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return { message: 'No token provided' };

    await this.authService.logout(token);
    return { message: 'Logged out successfully' };
  }
}
