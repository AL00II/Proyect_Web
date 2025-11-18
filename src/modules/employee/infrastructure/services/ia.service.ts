import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IAService {
  private baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('IA_SERVICE_URL') ?? '';
  }

  async generateEmbedding(imageBase64: string): Promise<number[]> {
    const res = await firstValueFrom(
      this.http.post(`${this.baseUrl}/embedding`, {
        image: imageBase64,
      })
    );

    return res.data.embedding;
  }
}
