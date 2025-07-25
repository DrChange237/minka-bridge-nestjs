// src/minka/minka.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { LedgerSdk, types as MinkaTypes } from '@minka/ledger-sdk';
import { TransferIntentDto } from 'src/dto/transfer.intent.dto';
import { AccessAction, ClaimAction, IntentCommitMode, LedgerKeyPair } from '@minka/ledger-sdk/types';

@Injectable()
export class IntentService {
  private readonly logger = new Logger(IntentService.name);

  constructor() {
    
  }

  async createTransferIntent(dto: TransferIntentDto): Promise<any> {

    const sdk = new LedgerSdk({
      server: "https://azamra-tst.ldg-stg.one/api/v2",
      ledger: "azamra-tst",
    });

    const keyPair : LedgerKeyPair = {
      format: "ed25519-raw", 
      public: "z/eJubdzq77A6a3Woaxw6PSBc54NtRC5+LMYiMvVIQc=",
      secret: "T+0HRLAKT+IXfo9YbbAhGJ1FTtv6B8qk+2eqU+GGd1k="
    };

      const { response } = await sdk.intent
      .init()
      .data({
        handle: "transfer-" + Date.now(), // Generate unique handle      
        schema: "transfer",  
        claims: [
          {
            action: ClaimAction.Transfer,
            amount: 5,
            source: {
              handle: "tran:1001001212@123wallet",
              custom: {
                name: "John Doe",
                idType: "txid",
                idNumber: "123456789",
                entityType: "individual"
              }
            },
            symbol: {
              handle: "usd"
            },
            target: {
              handle: "tran:1001001234@jordan",
              custom: {
                name: "Jane Smith",
                idType: "txid",
                idNumber: "987654321",
                entityType: "individual"
              }
            }
          }
        ],
        config: {
          commit: IntentCommitMode.Auto
        },
        access: [
          {
            action: AccessAction.Any,
            signer: {
              public: keyPair.public
            }
          }
        ]
      })
      .hash()
      .sign([{ keyPair } ])
      .send();

    /*console.log(
      "Created intent:",
      JSON.stringify(response.data, null, 4)
    );*/

    /*const handle = `transfer-${Date.now()}`;

    const { response } = await this.sdk.intent
      .init()
      .data({
        handle: handle,
        claims: [
          {
            action: ClaimAction.Transfer,
            amount: dto.amount,
            source: dto.source,
            symbol: { handle: dto.symbol },
            target: dto.target,
          },
        ],
        config: { commit: IntentCommitMode.Auto },
        access: [
          {
            action: MinkaTypes.AccessAction.Any,
            signer: {
              public: this.keyPair.public,
            },
          },
        ],
      })
      .hash()
      .sign([{ keyPair: this.keyPair }])
      .send();*/

    //this.logger.log(`Intent créé : ${JSON.stringify(response.data, null, 2)}`);
    //return response.data;
  }
}
