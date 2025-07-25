// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Req, Post, Param } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';
import { CreditService } from 'src/service/credit.service';


@Controller('credits')
export class CreditController {

  constructor(private readonly creditService: CreditService) {}
  

  @Post()
  async credit(@Req() request: Request): Promise<any> {
    console.log(
      "Request:",
      request.body
    );
    return await this.creditService.prepare(request.body);
  }

   @Post('/:handle/abort')
    async abort(@Req() request: Request, @Param('handle') handle: string): Promise<any> {
      console.log(handle)
      console.log(
        "Request:",
        request.body
      );
      return await this.creditService.abort(request.body);
    }
  
    @Post('/:handle/commit')
    async commit(@Req() request: Request, @Param('handle') handle: string): Promise<any> {
      console.log(handle)
      console.log(
        "Request:",
        request.body
      );
      return await this.creditService.commit(request.body);
    }
}