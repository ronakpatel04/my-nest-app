import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role name to be created' })
  name: string;
}

export class UpdateRoleDto {
  @ApiProperty({ example: 'EDITOR', description: 'Updated role name' })
  name: string;
}
