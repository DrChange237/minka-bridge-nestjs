import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DebitController } from './controllers/debit.controller';
import { IntentService } from './service/intent.service';
import { IntentController } from './controllers/intent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitService } from './service/debit.service';
import { CreditController } from './controllers/credit.controller';
import { CreditService } from './service/credit.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigImplService } from './service/config.service';



@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'azamra-service',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // à désactiver en production
    }),
    ConfigModule.forRoot({
      isGlobal: true, // rend le module accessible partout sans avoir à le réimporter
      envFilePath: '.env', // par défaut c’est .env, donc optionnel
    }),
  ],
  controllers: [AppController, DebitController,CreditController,IntentController],
  providers: [AppService, DebitService, CreditService, IntentService, ConfigImplService],
})
export class AppModule {}
