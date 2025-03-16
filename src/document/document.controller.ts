import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RolesGuard } from 'src/role/roles.guard';
import { DocumentService } from './document.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createResponse } from 'src/utils/response.util';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateDocumentDto } from './dto/document.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

@Controller('document')
@UseGuards(RolesGuard)
@ApiBearerAuth('access-token')
export class DocumentController {
  constructor(private documentService: DocumentService) {}
  @Roles('ADMIN', 'EDITOR')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    try {
      if (!file) return createResponse(false, 400, 'File is required');

      if (!req.user) {
        throw new UnauthorizedException(
          'User information is missing in the request',
        );
      }
      const user = req.user;
      const document = await this.documentService.uploadDocument(
        file.originalname,
        `uploads/${file.originalname}`,
        file.mimetype,
        file.size,
        user.id,
      );

      return document;
    } catch (error) {
      throw error;
    }
  }

  @Roles('ADMIN', 'EDITOR', 'USER')
  @Get(':id')
  async getDocument(@Param('id') id: string) {
    return await this.documentService.getDocument(id);
  }

  @Roles('ADMIN', 'EDITOR', 'USER')
  @Get()
  async getAllDocuments() {
    return await this.documentService.getAllDocuments();
  }

  @Roles('ADMIN', 'EDITOR')
  @Patch(':id')
  async updateDocument(
    @Param('id') id: string,
    @Body() body: UpdateDocumentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException(
        'User information is missing in the request',
      );
    }
    return await this.documentService.updateDocument(id, body, user.role);
  }

  @Roles('ADMIN')
  @Delete(':id')
  async deleteDocument(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException(
        'User information is missing in the request',
      );
    }
    return await this.documentService.deleteDocument(id, user.role);
  }
}
