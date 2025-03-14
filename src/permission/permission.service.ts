import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/permission.dto';
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
      return createResponse(true, 201, 'Permission created successfully', permission);
    } catch (error) {
      throw new BadRequestException('Error creating permission');
    }
  }

  async getAllPermissions() {
    const permissions = await this.prisma.permission.findMany();
    return createResponse(true, 200, 'Permissions retrieved', permissions);
  }

  async getPermissionById(id: string) {
    const permission = await this.prisma.permission.findUnique({ where: { id } });
    if (!permission) throw new NotFoundException('Permission not found');
    return createResponse(true, 200, 'Permission retrieved', permission);
  }

  async updatePermission(id: string, dto: UpdatePermissionDto) {
    try {
      const updatedPermission = await this.prisma.permission.update({
        where: { id },
        data: { name: dto.name, description: dto.description },
      });
      return createResponse(true, 200, 'Permission updated successfully', updatedPermission);
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
}
