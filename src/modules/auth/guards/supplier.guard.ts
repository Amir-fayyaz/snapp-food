import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SupplierService } from 'src/modules/supplier/supplier.service';
import { SupplierTokenPaylod } from '../types/supplier-TokenPaylod.type';

@Injectable()
export class SupplierGuard implements CanActivate {
  constructor(
    private readonly SupplierService: SupplierService,
    private readonly JwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();

    const token = this.extractToken(request);

    const supplier = await this.validateToken(token);

    request.supplier = {
      id: supplier.id,
      mobile: supplier.manager_mobile,
      role: 'supplier',
    };

    return true;
  }

  private extractToken(request: Request): string {
    if (!request.headers.authorization)
      throw new UnauthorizedException('Invalid token');

    const [type, token] = request.headers?.authorization?.split(' ');

    if (type !== 'Bearer' || !token) throw new UnauthorizedException();

    return token;
  }

  private async validateToken(token: string) {
    try {
      const paylod: SupplierTokenPaylod = await this.JwtService.verifyAsync(
        token,
        { secret: process.env.JWT_SECRET },
      );

      if (!paylod) throw new UnauthorizedException();

      const supplier = await this.SupplierService.findSupplierById(
        paylod.supplier_id,
      );

      return supplier;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
