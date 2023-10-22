import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    signinLocal(
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        return this.authService.signinLocal(username, password);
    }

    @Post("signup")
    signupLocal(@Body() dto: CreateAuthDto) {
        return this.authService.signupLocal(dto);
    }
}
