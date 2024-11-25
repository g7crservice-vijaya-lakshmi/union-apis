import { Module } from '@nestjs/common';
import { UnionbankAccountsService } from './unionbank-accounts.service';
import { UnionbankAccountsController } from './unionbank-accounts.controller';
import { AbstractAccountSvc } from './unionbank-account.abstract';
import AppLogger from '@app/core/logger/app-logger';

@Module({
  imports: [],
  controllers: [UnionbankAccountsController],
  providers: [
    {
      provide:AbstractAccountSvc,
      useClass: UnionbankAccountsService
    },
    AppLogger
  ],
  exports:[
    {
      provide:AbstractAccountSvc,
      useClass: UnionbankAccountsService
    },
  ]
})

export class UnionbankAccountsModule {}
