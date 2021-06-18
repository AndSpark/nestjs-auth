import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './db-connection.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: DatabaseConnectionService,
		}),
		ConfigModule.forRoot(),
		AuthModule
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
