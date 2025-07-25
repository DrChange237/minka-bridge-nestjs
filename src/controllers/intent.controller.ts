// src/minka/minka.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { TransferIntentDto } from 'src/dto/transfer.intent.dto';
import { IntentService } from 'src/service/intent.service';

@Controller('intent')
export class IntentController {
  constructor(private readonly intentService: IntentService) {}

  @Post('transfer')
  async createIntent(@Body() dto: TransferIntentDto) {
    return this.intentService.createTransferIntent(dto);
  }
}
