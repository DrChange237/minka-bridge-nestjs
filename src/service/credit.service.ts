import { AbortResult, CommitResult, IBankAdapter, PrepareResult, ResultStatus, TransactionContext } from '@minka/bridge-sdk';
import { Injectable } from '@nestjs/common';
import { TypePrepareResult } from 'src/dto/TypePrepareResult';

@Injectable()
export class CreditService extends IBankAdapter {

  prepare(context: TransactionContext): Promise<TypePrepareResult> {
    
    console.log('RECEIVED POST /credits')
 
    let result: TypePrepareResult
    const date = new Date();
    const moment = date.toISOString();
 
    result = {
      handle : (context as any)?.handle,
      status: ResultStatus.Prepared,
      /*coreId: "txid-" + Date.now(),*/
      moment  : moment
    }

    console.log(result)
 
    return Promise.resolve(result)
    
  }

  abort(context: TransactionContext): Promise<AbortResult> {
     console.log('RECEIVED POST /abort')
        let result: AbortResult 
        result = {
        status: ResultStatus.Aborted,
        }
    return Promise.resolve(result)
  }

  commit(context: TransactionContext): Promise<CommitResult> {
    console.log('RECEIVED POST /commit')
    let result: CommitResult
    result = {
      status: ResultStatus.Committed,
    }
    return Promise.resolve(result)
  }

  
}
