import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { createResponse } from 'src/utils/response.util';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(
    email: string,
    password: string,
    roleName: string,
    name?: string,
  ) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
          throw new ConflictException('User with this email already exists');
        }

        const role = await prisma.role.findUnique({
          where: { name: roleName },
        });
        if (!role) {
          throw new BadRequestException(
            `Invalid role. Role "${roleName}" does not exist.`,
          );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
          data: { email, password: hashedPassword, name },
        });

        const { password: _, ...userWithoutPassword } = user;

        await prisma.userInRole.create({
          data: { userId: user.id, roleId: role.id },
        });

        return createResponse(true, 201, 'User registered successfully', userWithoutPassword);
      });
    } catch (error) {
      throw error;
    }
  }

  async signin(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }

      const user = await this.prisma.user.findUnique({
        where: { email },
        include: {
          roles: { include: { role: true } },
        },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const role = user.roles[0]?.role?.name || 'user';
      const token = this.generateToken(user.id, user.email, role);

      return createResponse(true, 200, 'User logged in successfully', token);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      console.error('Error during signin:', error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again.',
      );
    }
  }

  private generateToken(userId: string, email: string,role:string) {
    const payload = { sub: userId, email ,role};
    return { token: this.jwtService.sign(payload) };
  }
}
