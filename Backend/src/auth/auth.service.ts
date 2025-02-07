import { ConflictException, HttpException, HttpStatus, Injectable, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/AuthDto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private configService: ConfigService,
        private userServise: UserService,
    ) { }
    async signUp(dto: AuthDto) {
        try {
            const findUser = await this.userServise.findOne(dto.email);
            if (findUser !== null && findUser.username === dto.email) {
                throw new ConflictException('User with this email already exists');
            }
            const user = await this.userServise.create(dto);
            const tokens = await this.createTocken(user.username, user.id);
            await this.userServise.save({ ...user, refreshTocken: await tokens.refresh_tocken });
            return {
                access_tocken: await tokens.access_tocken,
                refresh_tocken: await tokens.refresh_tocken,
            };
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(dto: AuthDto) {
        try {
            const user = await this.userServise.findOne(dto.email);
            if (user === null) {
                throw new HttpException('User with this username not foundd', HttpStatus.BAD_REQUEST);
            }
            const isMatch = await argon.verify(user.hashedPassword, dto.password);
            if (!isMatch) {
                throw new ConflictException('Invalid credentials');
            }
            const tokens = await this.createTocken(user.username, user.id);
            await this.userServise.update(user.id, { ...user, refreshTocken: await tokens.refresh_tocken });
            return {
                access_tocken: await tokens.access_tocken,
                refresh_tocken: await tokens.refresh_tocken,
            };
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    async refreshTockens(username: string, id: number) {
        try {
            const user = await this.userServise.findOne(username);
            if (user === null) {
                throw new UnprocessableEntityException('This user does not exist');
            }
            const tokens = await this.createTocken(user.username, user.id);
            return {
                access_tocken: await tokens.access_tocken,
            }
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createTocken(username: string, id: number): Promise<{ access_tocken: string, refresh_tocken: string }> {
        const access_tocken = await this.jwt.signAsync({
            sub: id,
            username: username,
        }, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_IN')
        });
        const refresh_tocken = await this.jwt.signAsync({
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
