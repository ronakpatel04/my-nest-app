import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @ApiProperty({ example: 'StrongPassword123', description: 'User password' })
  password: string;

  @ApiProperty({ example: 'ADMIN', description: 'Role assigned to the user' })
  roleName: string;

  @ApiProperty({ example: 'John Doe', required: false, description: 'Full name (optional)' })
  name?: string;
}

export class SigninDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @ApiProperty({ example: 'StrongPassword123', description: 'User password' })
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT token' })
  token: string;
}
