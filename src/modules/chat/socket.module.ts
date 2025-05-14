import { Module } from '@nestjs/common';
import { IndexGateway } from './index.gateway';

@Module({
  imports: [],
  providers: [IndexGateway],
  exports: [],
})
export class WebSocketModule {}
