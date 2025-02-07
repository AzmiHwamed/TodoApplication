import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Min, min } from 'class-validator';
export class AuthDto {
    @ApiProperty()
    @IsNotEmpty()
    email: string;
    @ApiProperty()
    password: string;
}