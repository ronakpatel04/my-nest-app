import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  AssignPermissionsDto,
  CreatePermissionDto,
  UpdatePermissionDto,
} from './dto/permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/utils/response.util';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async createPermission(dto: CreatePermissionDto) {
    try {
      const permission = await this.prisma.permission.create({
        data: { name: dto.name, description: dto.description },
      });
      return createResponse(
        true,
        201,
        'Permission created successfully',
        permission,
      );
    } catch (error) {
      throw new BadRequestException('Error creating permission');
    }
  }

  async getAllPermissions() {
    const permissions = await this.prisma.permission.findMany();
    return createResponse(true, 200, 'Permissions retrieved', permissions);
  }

  async getPermissionById(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });
    if (!permission) throw new NotFoundException('Permission not found');
    return createResponse(true, 200, 'Permission retrieved', permission);
  }

  async updatePermission(id: string, dto: UpdatePermissionDto) {
    try {
      const updatedPermission = await this.prisma.permission.update({
        where: { id },
        data: { name: dto.name, description: dto.description },
      });
      return createResponse(
        true,
        200,
        'Permission updated successfully',
        updatedPermission,
      );
    } catch (error) {
      throw new NotFoundException('Permission not found');
    }
  }

  async deletePermission(id: string) {
    try {
      await this.prisma.permission.delete({ where: { id } });
      return createResponse(true, 200, 'Permission deleted successfully');
    } catch (error) {
      throw new NotFoundException('Permission not found');
    }
  }

  async assignPermissionsToRole(dto: AssignPermissionsDto) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const role = await prisma.role.findUnique({
          where: { id: dto.roleId },
        });
        if (!role) throw new BadRequestException('Role not found');

        const permissions = await prisma.permission.findMany({
          where: { id: { in: dto.permissionIds } },
        });

        if (permissions.length !== dto.permissionIds.length) {
          throw new BadRequestException('Some permissions not found');
        }

        const rolePermissions = dto.permissionIds.map((permissionId) => ({
          roleId: dto.roleId,
          permissionId,
        }));

        await prisma.rolePermission.createMany({ data: rolePermissions });

        return createResponse(true, 201, 'Permissions assigned successfully');
      });
    } catch (error) {
      throw error;
    }
  }
}
