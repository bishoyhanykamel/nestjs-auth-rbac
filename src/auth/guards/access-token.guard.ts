import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/config/jwt.config';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);

    if (!token) throw new UnauthorizedException('No access token was provided.');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
        secret: this.jwtConfiguration.secret,
      });

      request[REQUEST_USER_KEY] = payload;
      console.log(payload);
    } catch (err) {
      throw new UnauthorizedException('Malformed token.');
    }

    return true;
  }


  private getToken(request: Request) {
    const [_, accessToken] = request.headers.authorization?.split(' ') ?? [];
    return accessToken;
  }
}
