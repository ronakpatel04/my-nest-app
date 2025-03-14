import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Post()
    async createRole(@Body('name') name: string) {
      return this.roleService.createRole(name);
    }
  
    @Get()
    async getAllRoles() {
      return this.roleService.getAllRoles();
    }
  
    @Get(':id')
    async getRoleById(@Param('id') id: string) {
      return this.roleService.getRoleById(id);
    }
  
    @Patch(':id')
    async updateRole(@Param('id') id: string, @Body('name') name: string) {
      return this.roleService.updateRole(id, name);
    }
  
    @Delete(':id')
    async deleteRole(@Param('id') id: string) {
      return this.roleService.deleteRole(id);
    }
  
}
