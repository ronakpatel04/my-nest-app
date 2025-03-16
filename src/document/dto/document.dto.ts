import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class UploadDocumentDto {
  @ApiProperty({ example: 'document.pdf', description: 'Original file name' })
  @IsString()
  originalName: string;

  @ApiProperty({ example: 'uploads/document.pdf', description: 'File storage path' })
  @IsString()
  path: string;

  @ApiProperty({ example: 'application/pdf', description: 'MIME type of the file' })
  @IsString()
  mimeType: string;

  @ApiProperty({ example: 204800, description: 'File size in bytes' })
  @IsNumber()
  size: number;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Uploader user ID' })
  @IsUUID()
  uploadedBy: string;
}

export class UpdateDocumentDto {
  @ApiProperty({ example: 'Updated Document Name', description: 'New document name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'New document description', description: 'Updated description', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class DocumentResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Document ID' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'document.pdf', description: 'Original file name' })
  @IsString()
  originalName: string;

  @ApiProperty({ example: 'uploads/document.pdf', description: 'File storage path' })
  @IsString()
  path: string;

  @ApiProperty({ example: 'application/pdf', description: 'MIME type of the file' })
  @IsString()
  mimeType: string;

  @ApiProperty({ example: 204800, description: 'File size in bytes' })
  @IsNumber()
  size: number;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Uploader user ID' })
  @IsUUID()
  uploadedBy: string;
}
