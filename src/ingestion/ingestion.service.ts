import { Injectable } from '@nestjs/common';

@Injectable()
export class IngestionService {
    private ingestionStatus = new Map<string, { status: string; embeddings?: number[] }>();

    async triggerIngestion(): Promise<{ ingestionId: string }> {
      const ingestionId = `ingest_${Date.now()}`;
      
      this.ingestionStatus.set(ingestionId, { status: 'Processing' });
  
      setTimeout(() => {
        const isSuccess = Math.random() > 0.2; 
        if (isSuccess) {
          this.ingestionStatus.set(ingestionId, { status: 'Completed', embeddings: this.generateMockEmbeddings() });
        } else {
          this.ingestionStatus.set(ingestionId, { status: 'Failed' });
        }
      }, 7000);
  
      return { ingestionId };
    }
  
    async getIngestionStatus(ingestionId: string): Promise<{ status: string; embeddings?: number[] }> {
      return this.ingestionStatus.get(ingestionId) || { status: 'Not Found' };
    }
  
    private generateMockEmbeddings(): number[] {
      return Array.from({ length: 128 }, () => Math.random());
    }
  
}
