import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/utils/response.util';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}
  async createRole(name: string) {
    try {
      const existingRole = await this.prisma.role.findUnique({
        where: { name },
      });
      if (existingRole) throw new ConflictException('Role already exists');

      const role = await this.prisma.role.create({ data: { name } });
      return createResponse(true, 201, 'Role created successfully', role);
    } catch (error) {
      throw error;
    }
  }

  async getAllRoles() {
    try {
      const roles = await this.prisma.role.findMany();
      return createResponse(true, 200, 'Roles fetched successfully', roles);
    } catch (error) {
      throw error;
    }
  }

  async getRoleById(id: string) {
    try {
      const role = await this.prisma.role.findUnique({ where: { id } });
      if (!role) throw new NotFoundException('Role not found');
      return createResponse(true, 200, 'Role fetched successfully', role);
    } catch (error) {
      throw error;
    }
  }

  async updateRole(id: string, name: string) {
    try {
      const updatedRole = await this.prisma.role.update({
        where: { id },
        data: { name },
      });
      return createResponse(
        true,
        200,
        'Role updated successfully',
        updatedRole,
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteRole(id: string) {
    try {
      await this.prisma.role.delete({ where: { id } });
      return createResponse(true, 200, 'Role deleted successfully');
    } catch (error) {
      throw error;
    }
  }
}
