// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Req, Post, Param } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';
import { DebitService } from 'src/service/debit.service';


@Controller('debits')
export class DebitController {

  constructor(private readonly debitService: DebitService) {}
  

  @Post()
  async debit(@Req() request: Request): Promise<any> {
    console.log(
      "Request:",
      request.body
    );
    return await this.debitService.prepare(request.body);
  }

  @Post('/:handle/abort')
  async abort(@Req() request: Request, @Param('handle') handle: string): Promise<any> {
    console.log(handle)
    console.log(
      "Request:",
      request.body
    );
    return await this.debitService.abort(request.body);
  }

  @Post('/:handle/commit')
  async commit(@Req() request: Request, @Param('handle') handle: string): Promise<any> {
    console.log(handle)
    console.log(
      "Request:",
      request.body
    );
    return await this.debitService.commit(request.body);
  }
}