import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JWTStrategy } from './strategy/jwt.strategy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JWTRefreshStrategy } from './strategy/jwtRefresh.strategy';

@Module({
  imports: [JwtModule.register({}),ConfigModule.forRoot(),UserModule],
  controllers: [AuthController],
  providers: [AuthService,JWTStrategy,JWTRefreshStrategy],
})
export class AuthModule {}
