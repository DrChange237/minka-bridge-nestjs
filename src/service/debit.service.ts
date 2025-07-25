import { AbortResult, CommitResult, IBankAdapter, PrepareResult, ResultStatus, TransactionContext } from '@minka/bridge-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DebitService extends IBankAdapter {

  prepare(context: TransactionContext): Promise<PrepareResult> {
    
    console.log('RECEIVED POST /debits')
 
    let result: PrepareResult
 
    result = {
      status: ResultStatus.Prepared,
      coreId: "txid-" + Date.now(),
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
