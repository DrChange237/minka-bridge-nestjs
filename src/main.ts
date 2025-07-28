/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import {
  DataSourceOptions,
  LedgerClientOptions,
  ProcessorBuilder,
  ProcessorOptions,
  ServerBuilder,
  ServerOptions,
} from '@minka/bridge-sdk';

import sleep from 'sleep-promise';
import { CreditService } from './service/credit.service';
import { DebitService } from './service/debit.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // lire les variables depuis ConfigService
  const dataSource: DataSourceOptions = {
    host: configService.get<string>('TYPEORM_HOST'),
    port: configService.get<number>('TYPEORM_PORT'),
    database: configService.get<string>('TYPEORM_DATABASE'),
    username: configService.get<string>('TYPEORM_USERNAME'),
    password: configService.get<string>('TYPEORM_PASSWORD'),
    connectionLimit: configService.get<number>('TYPEORM_CONNECTION_LIMIT'),
    migrate: false,
  };

  const ledger: LedgerClientOptions = {
    ledger: {
      handle: configService.get<string>('LEDGER_HANDLE'),
      signer: {
        format: 'ed25519-raw',
        public: configService.get<string>('LEDGER_PUBLIC_KEY'),
      },
    },
    server: configService.get<string>('LEDGER_SERVER'),
    bridge: {
      signer: {
        format: 'ed25519-raw',
        public: configService.get<string>('BRIDGE_PUBLIC_KEY'),
        secret: configService.get<string>('BRIDGE_SECRET_KEY'),
      },
      handle: 'mint',
    },
  };

  const bootstrapServer = async () => {
    const server = ServerBuilder.init()
      .useDataSource({ ...dataSource, migrate: true })
      .useLedger(ledger)
      .build();

    const options: ServerOptions = {
      port: configService.get<number>('PORT'),
      routePrefix: 'v2',
    };
    await server.start(options);
  };

  const bootstrapProcessor = async (handle: string) => {
    const processor = ProcessorBuilder.init()
      .useDataSource(dataSource)
      .useLedger(ledger)
      .useCreditAdapter(new CreditService())
      .useDebitAdapter(new DebitService())
      .build();

    const options: ProcessorOptions = {
      handle,
    };
    await processor.start(options);
  };

  const processors = ['proc-0'];

  await bootstrapServer();
  //await sleep(2000);

  for (const handle of processors) {
    await bootstrapProcessor(handle);
  }

  //await app.listen(configService.get<number>('PORT') ?? 3001);
}

bootstrap();
