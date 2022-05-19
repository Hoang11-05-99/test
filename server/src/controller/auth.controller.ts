import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateAccountDTO } from 'src/dto/createAccountDto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: CreateAccountDTO) {
    return this.authService.registerAccount(user);
  }

  @Post('login')
  login(@Body() user: CreateAccountDTO) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAccount')
  getAccount(@Req() req) {
    return this.authService.getAccount(req.user._id);
  }
}
