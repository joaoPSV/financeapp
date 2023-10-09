import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

export interface CustomRequest extends Request {
  user: JwtPayload;
}

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      try {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();

        const token = request.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
          throw new UnauthorizedException('Empty authorization');
        }

        const decodedToken = verify(token, process.env.SECRET_KEY);
        console.log('decoded ', decodedToken);
        (request as JwtPayload).user = decodedToken;
      } catch (err) {
        throw new UnauthorizedException('Invalid token!');
      }
    }
    return next.handle();
  }
}
