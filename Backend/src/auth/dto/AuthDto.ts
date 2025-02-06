import { IsEmail, IsNotEmpty, Min, min } from 'class-validator';
export class AuthDto {
    @IsNotEmpty()
    email: string;
    password: string;
}