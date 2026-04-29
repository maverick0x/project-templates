import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class KycService {
  constructor(private readonly configService: ConfigService) { }

  async createV3Session(userId: string) {
    const url: string =
      this.configService.get<string>('DIDIT_SESSION_URL') ?? '';

    const headers = {
      'x-api-key': this.configService.get<string>('DIDIT_API_KEY') ?? '',
      'Content-Type': 'application/json',
    };

    const payload = {
      workflow_id: this.configService.get<string>('DIDIT_KYB_WORKFLOW'),
      vendor_data: userId,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = (await response
          .json()
          .catch(() => 'No error details')) as unknown;
        console.error(`Didit API Error (${response.status}):`, errorData);
        throw new Error(`Failed to create session. Status: ${response.status}`);
      }

      const data = (await response.json()) as {
        session_token: string;
        url?: string;
      };

      return data;
    } catch (error) {
      console.error('Error initiating KYC session:', error);
      throw new InternalServerErrorException('Could not initiate KYC session');
    }
  }
}
