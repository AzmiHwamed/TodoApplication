import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]),JwtModule.register({}),ConfigModule.forRoot(),],
  exports: [UserService]
})
export class UserModule {}
