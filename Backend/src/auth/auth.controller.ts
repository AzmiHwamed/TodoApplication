import { Body, Controller, Get, Post, Req, UseGuards, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/AuthDto';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

// Define an interface to extend Express' Request object
interface AuthenticatedRequest extends Request {
    user: { id: number; username: string }; // Ensure it matches what `validate()` returns in JWTStrategy
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,

    ) {}

    @Post('login')
    async login(@Body() dto: AuthDto, @Res() res: Response) {
        const result = await this.authService.login(dto);
        return res.status(200).json({ data: result });
    }

    @Post('signup')
    async signup(@Body() dto: AuthDto, @Res() res: Response) {
        const result = await this.authService.signUp(dto);
        if (result.success) {
            return res.status(201).json({ data: result });
        } else {
            return res.status(400).json({ message: "Error signing up" });
        }
    }
     @Get('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    async refresh(@Req() req: AuthenticatedRequest, @Res() res: Response) {
        const result = await this.authService.refreshTockens(req.user.username, req.user.id);
        if (await result.success === true) {
            return res.status(200).json({ data: result });
        } else {
            return res.status(400).json({ message: "Error refreshing tokens" });
        }
    }
}
