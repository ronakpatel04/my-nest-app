import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  Length,
  ArrayNotEmpty,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'VIEW_USERS',
    description: 'Permission name',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    example: 'Allows viewing users',
    description: 'Permission description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdatePermissionDto {
  @ApiProperty({
    example: 'EDIT_USERS',
    description: 'Updated permission name',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    example: 'Allows editing users',
    description: 'Updated permission description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class AssignPermissionsDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Role ID to assign permissions to',
  })
  @IsUUID()
  roleId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({
    example: [
      'c3fcd3d7-9b93-40fc-8e89-2de9f2f61f6d',
      'a8e8d2b1-daa9-4f9b-b3b8-5c0aa1e3f3b1',
    ],
    description: 'List of permission IDs to assign',
  })
  permissionIds: string[];
}
