import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    async signinLocal(
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        const data = await this.authService.signinLocal(username, password);
        return {
            data,
            statusCode: 200,
        };
    }

    @Post('signup')
    async signupLocal(@Body() dto: CreateAuthDto) {
        const data = await this.authService.signupLocal(dto);
        return {
            data,
            statusCode: 200,
        };
    }
}
