import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RolesGuard } from './role/roles.guard';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    RoleModule,
    PermissionModule,
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
