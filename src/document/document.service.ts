import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/utils/response.util';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async uploadDocument(
    name: string,
    path: string,
    mimeType: string,
    size: number,
    createdBy: string,
  ) {
    try {
      if (!name || !path || !mimeType || !size) {
        throw new BadRequestException('All document fields are required');
      }

      const document = await this.prisma.document.create({
        data: { name, path, mimeType, size, createdBy },
      });

      return createResponse(
        true,
        201,
        'Document uploaded successfully',
        document,
      );
    } catch (error) {
      console.error('Error uploading document:', error);
      throw new InternalServerErrorException('Failed to upload document');
    }
  }

  async getDocument(id: string) {
    try {
      const document = await this.prisma.document.findUnique({ where: { id } });

      if (!document) {
        throw new NotFoundException('Document not found');
      }

      return createResponse(
        true,
        200,
        'Document retrieved successfully',
        document,
      );
    } catch (error) {
      throw error;
    }
  }

  async getAllDocuments() {
    try {
      const documents = await this.prisma.document.findMany();
      return createResponse(
        true,
        200,
        'Documents retrieved successfully',
        documents,
      );
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw new InternalServerErrorException('Failed to retrieve documents');
    }
  }

  async updateDocument(
    id: string,
    updatedData: Partial<{ name: string }>,
    userRole: string,
  ) {
    try {
      if (userRole !== 'ADMIN' && userRole !== 'EDITOR') {
        throw new ForbiddenException(
          'You do not have permission to edit documents',
        );
      }

      const document = await this.prisma.document.update({
        where: { id },
        data: updatedData,
      });

      return createResponse(
        true,
        200,
        'Document updated successfully',
        document,
      );
    } catch (error) {
      console.error('Error updating document:', error);
      throw new InternalServerErrorException('Failed to update document');
    }
  }

  async deleteDocument(id: string, userRole: string) {
    try {
      if (userRole !== 'ADMIN') {
        throw new ForbiddenException(
          'You do not have permission to delete documents',
        );
      }

      await this.prisma.document.delete({ where: { id } });
      return createResponse(true, 200, 'Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      throw new InternalServerErrorException('Failed to delete document');
    }
  }
}
