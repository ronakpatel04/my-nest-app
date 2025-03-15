import {
  IsString,
  IsOptional,
  Length,
  ArrayNotEmpty,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdatePermissionDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class AssignPermissionsDto {
  @IsUUID()
  roleId: string;

  @IsArray()
  @ArrayNotEmpty()
  permissionIds: string[];
}
