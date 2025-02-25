import { Body, Controller, Get, Post, Req, UseGuards, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/AuthDto';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ApiAcceptedResponse, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Authentifications')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,

    ) { }
    @ApiOperation({
        summary:
            'Takes the AuthDto as a body, returns success true if the operation was successful with tokens, returns success false with an error message if the operation failed.',
    })
    @ApiResponse({
        status: 200,
        description: 'The login operation has been successfully executed.',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                access_tocken: { type: 'string', example: 'dfsfjklmsfddqfdghjkhgfds.fghgjklmswdxfcghjklolp.swdxfcghjbklm' },
                refresh_tocken: { type: 'string', example: 'dfsfjklmsfddqfdghjkhgfds.fghgjklmswdxfcghjklolp.swdxfcghjbklm' },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'The login operation failed due to an error.',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Invalid credentials' },
            },
        },
    })
    @Post('login')
    async login(@Body() dto: AuthDto, @Res() res: Response) {
        return res.json(await this.authService.login(dto));
    }






    @ApiResponse({
        status: 201,
        description: 'The signup operation has been successfully executed.',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                access_tocken: { type: 'string', example: 'dfsfjklmsfddqfdghjkhgfds.fghgjklmswdxfcghjklolp.swdxfcghjbklm' },
                refresh_tocken: { type: 'string', example: 'dfsfjklmsfddqfdghjkhgfds.fghgjklmswdxfcghjklolp.swdxfcghjbklm' },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'The signup operation failed due to an error.',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Invalid credentials' },
            },
        },
    })
    @ApiOperation({ summary: 'Takes the AuthDto as a body , return success true if a the operation was successfull with the tockens ,return success false with error message if the operation failed ' })
    @Post('signup')
    async signup(@Body() dto: AuthDto, @Res() res: Response) {
        return res.json(await this.authService.signUp(dto));

    }
    @ApiOperation({ summary: 'Takes the Refresh_Tocken in autherization header , return the new access_tocken if the operation was successful' })
    @ApiResponse({
        status: 200,
        description: 'The Refresh operation has been successfully executed.',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                access_tocken: { type: 'string', example: 'dfsfjklmsfddqfdghjkhgfds.fghgjklmswdxfcghjklolp.swdxfcghjbklm' },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'The signup operation failed due to an error.',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Error refreshing tokens' },
            },
        },
    })
    @ApiHeader({
        name: '-H "Authorization: Bearer {token}',
        description: 'Authorization header to be used in the request (access token)'
    })
    @Get('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    async refresh(@Req() req: { id: number; username: string }, @Res() res: Response) {
        return res.json(await this.authService.refreshTockens(req.username, req.id));
    }
}
