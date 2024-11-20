import { Module } from '@nestjs/common';
import { CoreModule } from '@app/core/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountTransactionModule } from '../account-transaction/account-transaction.module';
import { UnionbankAccountsModule } from '../unionbank-accounts/unionbank-accounts.module';

@Module({
  imports: [
    CoreModule,
    AccountTransactionModule,
    UnionbankAccountsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 