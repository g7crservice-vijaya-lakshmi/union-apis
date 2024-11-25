import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AccountTransactionService } from './account-transaction.service';
import { CreditTransactionDto, DebitTransactionDto } from './dto/create-account-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import AppLogger from '@app/core/logger/app-logger';
import { AbstractAccountTransactionSvc } from './account.abstract';

@Controller('transaction')
@ApiTags('account-transaction')
export class AccountTransactionController {
  constructor(
    private readonly accountTransactionService: AbstractAccountTransactionSvc,
    private readonly _loggerSvc: AppLogger
  ) {}
  
  @Get('fetch-customerdata/:accountNumber?')
  fetchCustomer(@Param('accountNumber') accountNumber?: string) {
    return this.accountTransactionService.fetchCustomerTrasactions(accountNumber);
  }

  @Patch('credit-amount')
  creditAmount(@Body() creaditAmount:CreditTransactionDto) {
    return this.accountTransactionService.creditTransaction(creaditAmount);
  }

  @Patch('debit-amount')
  debitAmount(@Body() debitAmount:DebitTransactionDto) {
    return this.accountTransactionService.debitTransaction(debitAmount);
  }  

  @Patch('credit-bulk-salaries')
  creteBulkTrasacations(@Body() creditBulkAmount:CreditTransactionDto[]) {
    return this.accountTransactionService.creditBulkTrasacations(creditBulkAmount,4);
  }

  @Patch('debit-bulk-salaries')
  debitBulkTrasacations(@Body() debitBulkAmount:DebitTransactionDto[]) {
    return this.accountTransactionService.debitBulkTrasacations(debitBulkAmount,4);
  }
}
