import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new ForbiddenException('Access denied: No token provided');
    }

    try {
      const token = authHeader.split(' ')[1]; 
      const decoded = this.jwtService.verify(token);
    (request as any).user = decoded; 

      const requiredRole = this.reflector.get<string>('role', context.getHandler());
      if (requiredRole && decoded.role !== requiredRole) {
        throw new ForbiddenException('Access denied: Insufficient permissions');
      }

      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid or expired token');
    }
  }

}
