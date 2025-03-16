import { Controller, Get, Param, Post } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('ingestion')
@ApiBearerAuth('access-token') 
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger')
  async triggerIngestion() {
    return await this.ingestionService.triggerIngestion();
  }

  @Get('status/:ingestionId')
  async getStatus(@Param('ingestionId') ingestionId: string) {
    return await this.ingestionService.getIngestionStatus(ingestionId);
  }
}

