import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthAppService } from './auth.client.service';
import { SignUpDto } from '../dto/signUpDto.dto';
import { SignInDto } from '../dto/signInDto.dto';

@Controller('api/v1/client/auth')
@ApiTags('client-auth')
export class AuthAppController {
  constructor(private readonly AuthService: AuthAppService) {}

  @Post('getOtp')
  @ApiOperation({ summary: 'For get otp to login | register' })
  @ApiBody({ type: SignUpDto })
  async getOtp(@Body() signUpDto: SignUpDto) {
    return await this.AuthService.createOtp(signUpDto.mobile);
  }

  @Post('login')
  @ApiOperation({ summary: 'For login || register in website' })
  @ApiBody({ type: SignInDto })
  async login(@Body() data: SignInDto) {
    await this.AuthService.verifyOtp(data);

    const accessToken = await this.AuthService.getUser(data);

    return { accessToken };
  }
}
