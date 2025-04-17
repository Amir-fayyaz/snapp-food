import { Body, Controller, Post } from '@nestjs/common';
import { AuthSupplierService } from './auth.supplier.service';
import { SignUpDto } from './dto/signUp.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/auth/supplier')
@ApiTags('Auth-supplier')
export class AuthSupplierController {
  constructor(private readonly AuthService: AuthSupplierService) {}

  @Post('getOtp')
  @ApiOperation({ summary: 'For get otp to login/register' })
  @ApiBody({ type: SignUpDto })
  async getOtp(@Body() data: SignUpDto) {
    return await this.AuthService.getOtp(data.mobile);
  }
}
