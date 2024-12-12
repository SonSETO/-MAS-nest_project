import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { Authorization } from './decorator/authorization.decorator';
import {
  EventPattern,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { ParseBearerTokenDto } from './dto/parse-bearer-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  registerUser(
    @Authorization() token: string,
    @Body() registerDto: RegisterDto,
  ) {
    if (token === null) {
      throw new UnauthorizedException('토큰을 입력해주세요!');
    }

    return this.authService.register(token, registerDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  loginUser(@Authorization() token: string) {
    if (token === null) {
      throw new UnauthorizedException('토큰을 입력해주세요!');
    }
    return this.authService.login(token);
  }

  // 이벤트를 던지기만 함
  // @EventPattern()
  // 메시지를 받고 응답을 해줄 수 있음
  @MessagePattern(
    {
      cmd: 'parse_bearer_token',
    },
    // Transport.TCP 원래는 넣어줘야 하지만 우리는 1개만 사용하기 때문에 자동으로 인지함
  )
  @UsePipes(ValidationPipe)
  parseBearerToken(@Payload() payload: ParseBearerTokenDto) {
    console.log('Request Received');
    return this.authService.parseBearerToken(payload.token, false);
  }
}
