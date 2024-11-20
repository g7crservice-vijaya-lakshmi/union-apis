import { Module } from '@nestjs/common';
import { AccountTransactionService } from './account-transaction.service';
import { AccountTransactionController } from './account-transaction.controller';
import { AbstractAccountSqlDao } from '@app/database/mssql/abstract/accounts.abstract';
import { AbstractAccountTransactionSvc } from './account.abstract';
import AppLogger from '@app/core/logger/app-logger';

@Module({
  imports:[],
  controllers: [AccountTransactionController],
  providers: [
   {
    provide:AbstractAccountTransactionSvc,
    useClass:AccountTransactionService
   },
   AppLogger
  ],
  exports:[
    {
      provide:AbstractAccountTransactionSvc,
      useClass:AccountTransactionService
     }
  ]
})
export class AccountTransactionModule {}
