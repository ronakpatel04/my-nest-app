import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  AssignPermissionsDto,
  CreatePermissionDto,
  UpdatePermissionDto,
} from './dto/permission.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post()
  async createPermission(@Body() dto: CreatePermissionDto) {
    return this.permissionService.createPermission(dto);
  }

  @Get()
  async getAllPermissions() {
    return this.permissionService.getAllPermissions();
  }

  @Get(':id')
  async getPermissionById(@Param('id') id: string) {
    return this.permissionService.getPermissionById(id);
  }

  @Patch(':id')
  async updatePermission(
    @Param('id') id: string,
    @Body() dto: UpdatePermissionDto,
  ) {
    return this.permissionService.updatePermission(id, dto);
  }

  @Delete(':id')
  async deletePermission(@Param('id') id: string) {
    return this.permissionService.deletePermission(id);
  }

  @Post('assignToRole')
  async assignPermissionsToRole(@Body() body: AssignPermissionsDto) {
    return this.permissionService.assignPermissionsToRole(body);
  }
}
