import { Module } from '@nestjs/common';
import { MapGateway } from './chat.gateway';

@Module({
	providers:[MapGateway]
})
export class MapModule {}
