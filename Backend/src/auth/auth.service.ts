import { ConflictException, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/AuthDto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { access } from 'fs';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private configService: ConfigService,
        private userServise: UserService,
    ) { }
    async signUp(dto: AuthDto) {
        try {
            const user = await this.userServise.create(dto);
            const tokens = await this.createTocken(user.username, user.id);
            await this.userServise.save({ ...user, refreshTocken: await tokens.refresh_tocken });
            return {
                success: true,
                access_tocken: await tokens.access_tocken,
                refresh_tocken:await tokens.refresh_tocken,
            };
        } catch (error) {
            if (error instanceof ConflictException) {
                return { success: false, message: error.message };
            }
            return { success: false, message: 'An error occurred' };
        }
    }

    async login(dto: AuthDto) {
        const user = await this.userServise.findOne(dto.email);
        if (user === null) {
            return { success: false, message: "Not found user" };
        }
        const isMatch = await argon.verify(user.hashedPassword, dto.password);
        if (!isMatch) {
            return { success: false, message: "Password is not correct" };
        }
        const tokens = await this.createTocken(user.username, user.id);
        await this.userServise.update(user.id, { ...user, refreshTocken: await tokens.refresh_tocken });
        return {
            success: true,
            access_tocken: await tokens.access_tocken,
            refresh_tocken: await tokens.refresh_tocken,
        };

    }
    async refreshTockens(username: string, id: number) {
        const user =await this.userServise.findOne(username);
        if (user === null) {
            return { success: false, message: "Not found user" };
        }
        const tokens = await this.createTocken(user.username, user.id);
        return {
            success:true,
            access_tocken: await tokens.access_tocken,
        }
    }

    async createTocken(username: string, id: number) {
        const access_tocken = this.jwt.signAsync({
            sub: id,
            username: username,
        }, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_IN')
        });
        const refresh_tocken = this.jwt.signAsync({
            sub: id,
            username: username,
        }, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN')
        });
        return {
            access_tocken: access_tocken,
            refresh_tocken: refresh_tocken
        };

    }
}
