import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { UpdateDocumentDto } from './dto/document.dto';
import { UnauthorizedException } from '@nestjs/common';
import { RolesGuard } from 'src/role/roles.guard';

describe('DocumentController', () => {
  let documentController: DocumentController;
  let documentService: DocumentService;

  const mockUser = { id: '123', email: 'test@example.com', role: 'ADMIN' };
  const mockFile = { originalname: 'file.pdf', mimetype: 'application/pdf', size: 1024 };
  const mockDocument = {
    id: '1',
    name: 'file.pdf',
    url: 'uploads/file.pdf',
    type: 'application/pdf',
    size: 1024,
    createdBy: mockUser.id,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        {
          provide: DocumentService,
          useValue: {
            uploadDocument: jest.fn().mockResolvedValue(mockDocument),
            getDocument: jest.fn().mockResolvedValue(mockDocument),
            getAllDocuments: jest.fn().mockResolvedValue([mockDocument]),
            updateDocument: jest.fn().mockResolvedValue(mockDocument),
            deleteDocument: jest.fn().mockResolvedValue(mockDocument),
          },
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    documentController = module.get<DocumentController>(DocumentController);
    documentService = module.get<DocumentService>(DocumentService);
  });

  describe('Upload Document', () => {
    it('should upload a document', async () => {
      const req = { user: mockUser } as any;
      const result = await documentController.uploadDocument(mockFile as any, req);

      expect(result).toEqual(mockDocument);
      expect(documentService.uploadDocument).toHaveBeenCalledWith(
        mockFile.originalname,
        `uploads/${mockFile.originalname}`,
        mockFile.mimetype,
        mockFile.size,
        mockUser.id
      );
    });

    it('should throw error if file is missing', async () => {
      const req = { user: mockUser } as any;
      const result = await documentController.uploadDocument(null as any, req);
      expect(result).toEqual({ success: false, statusCode: 400, message: 'File is required' });
    });

    it('should throw UnauthorizedException if user info is missing', async () => {
      await expect(documentController.uploadDocument(mockFile as any, {} as any)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });

  describe('Get Document by ID', () => {
    it('should return a document', async () => {
      const result = await documentController.getDocument('1');
      expect(result).toEqual(mockDocument);
      expect(documentService.getDocument).toHaveBeenCalledWith('1');
    });
  });

  describe('Get All Documents', () => {
    it('should return a list of documents', async () => {
      const result = await documentController.getAllDocuments();
      expect(result).toEqual([mockDocument]);
      expect(documentService.getAllDocuments).toHaveBeenCalled();
    });
  });

  describe('Update Document', () => {
    it('should update a document', async () => {
      const updateDto: any = { name: 'Updated.pdf', url: 'uploads/updated.pdf' };
      const req = { user: mockUser } as any;

      const result = await documentController.updateDocument('1', updateDto, req);
      expect(result).toEqual(mockDocument);
      expect(documentService.updateDocument).toHaveBeenCalledWith('1', updateDto, mockUser.role);
    });

    it('should throw UnauthorizedException if user info is missing', async () => {
      const updateDto: any = { name: 'Updated.pdf', url: 'uploads/updated.pdf' };
      await expect(documentController.updateDocument('1', updateDto, {} as any)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });

  describe('Delete Document', () => {
    it('should delete a document', async () => {
      const req = { user: mockUser } as any;
      const result = await documentController.deleteDocument('1', req);
      expect(result).toEqual(mockDocument);
      expect(documentService.deleteDocument).toHaveBeenCalledWith('1', mockUser.role);
    });

    it('should throw UnauthorizedException if user info is missing', async () => {
      await expect(documentController.deleteDocument('1', {} as any)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});
