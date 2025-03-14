import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RolesGuard } from './roles.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule,AuthModule], 
  providers: [RoleService,RolesGuard],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
