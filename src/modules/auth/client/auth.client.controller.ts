import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthAppService } from './auth.client.service';
import { SignUpDto } from '../dto/signUpDto.dto';

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
}
