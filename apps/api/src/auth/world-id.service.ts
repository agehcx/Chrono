import {Injectable, Logger} from '@nestjs/common';
import axios from 'axios';
import {VerifyWorldIdDto} from './dto/verify-world-id.dto';

interface WorldIdVerificationResponse {
  success: boolean;
  nullifier_hash: string;
  device_type: string;
}

@Injectable()
export class WorldIdService {
  private readonly logger = new Logger(WorldIdService.name);

  async verifyProof(input: VerifyWorldIdDto) {
    const endpoint = process.env.WORLD_ID_VERIFY_URL ?? 'https://developer.worldcoin.org/api/v2/verify';
    try {
      const {data} = await axios.post<WorldIdVerificationResponse>(endpoint, input, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'chrono-api'
        },
        timeout: 5_000
      });

      if (!data.success) {
        return null;
      }

      return {
        nullifierHash: data.nullifier_hash,
        deviceType: data.device_type
      };
    } catch (error) {
      this.logger.error('World ID verification failed', error instanceof Error ? error.message : error);
      return null;
    }
  }
}
