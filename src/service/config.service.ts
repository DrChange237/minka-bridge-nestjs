import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigImplService {
  constructor(private configService: ConfigService) {}

   get(parameter : string): string {
    const param = this.configService.get<string>(parameter);
    return param;
  }

  getPort(): number {
    const port = this.configService.get<number>('PORT');
    return port;
  }

}