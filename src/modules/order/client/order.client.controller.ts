import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/common/decorators/auth.decorator';

@Controller('api/v1/client/orders')
@ApiTags('client-order')
@UserAuth()
export class OrderAppController {
  constructor() {}
}
