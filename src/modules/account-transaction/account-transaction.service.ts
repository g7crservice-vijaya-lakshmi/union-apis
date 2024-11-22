import { HttpStatus, Injectable } from '@nestjs/common';
import { CreditTransactionDto, DebitTransactionDto } from './dto/create-account-transaction.dto';
import { AbstractAccountTransactionSvc } from './account.abstract';
import { AbstractAccountTransactionSQlDao } from '@app/database/mssql/abstract/transaction.abstract';
import { DatabaseService } from '@app/database/database.service';
import AppLogger from '@app/core/logger/app-logger';
import { AppResponse, createResponse } from '@app/shared/appresponse.shared';
import { messageFactory, messages } from '@app/shared/messages.shared';


@Injectable()
export class AccountTransactionService implements AbstractAccountTransactionSvc {
  private readonly _transactionsTxn: AbstractAccountTransactionSQlDao;
	constructor(readonly _dbSvc: DatabaseService,
    readonly _loggerSvc: AppLogger
  ) {
    this._transactionsTxn = _dbSvc.trascationSqlTxn;
  }

  async creditTransaction(creaditAmount:CreditTransactionDto):Promise<AppResponse> {
    const customerAccountData = await this._transactionsTxn.fetchCustomerAccountDetails(creaditAmount.accountNumber);
    if(!customerAccountData) return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);

    if(customerAccountData.data.customer.CustomerName !== creaditAmount.CustomerName){
       return createResponse(HttpStatus.BAD_REQUEST, messageFactory(messages.E13, ['CustomerName']));
    }
      return await this._transactionsTxn.creditTransaction(creaditAmount)
  }

  async debitTransaction(debitAmount:DebitTransactionDto):Promise<AppResponse> {
    const customerAccountData = await this._transactionsTxn.fetchCustomerAccountDetails(debitAmount.accountNumber);
    if(!customerAccountData) return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);

    if(customerAccountData.data.customer.CustomerName !== debitAmount.CustomerName){
       return createResponse(HttpStatus.BAD_REQUEST, messageFactory(messages.E13, ['CustomerName']));
    }
    
    if (Number(debitAmount.amount) > customerAccountData.data.customer.BalanceAmount) {
      return createResponse(HttpStatus.OK, "You don't have sufficient amount to debit the amount.");
    }
    
    return await this._transactionsTxn.debitTransaction(debitAmount);
  }

  async validateCustomerTrasactionsData(creaditAmount:CreditTransactionDto){
      const customerAccountData = await this._transactionsTxn.fetchCustomerAccountDetails(creaditAmount.accountNumber);
       if(!customerAccountData) return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);

      if(customerAccountData.data.customer.CustomerName !== creaditAmount.CustomerName){
       return createResponse(HttpStatus.BAD_REQUEST, messageFactory(messages.E13, ['CustomerName']));
      }

      if(creaditAmount.transactionType === "debit"){
        if (Number(creaditAmount.amount) > customerAccountData.data.customer.BalanceAmount) {
          return createResponse(HttpStatus.OK, "You don't have sufficient amount to debit the amount.");
        }
      }
      return customerAccountData;
  }

  async creditBulkTrasacations(creditBulkAmount:CreditTransactionDto[]):Promise<AppResponse>{
    const multipleUpdate:any = await Promise.all(creditBulkAmount.map(async (customer) => {
      const validationResponse = await this.validateCustomerTrasactionsData(customer);

      if (validationResponse.code === 200) {
        return await this._transactionsTxn.creditTransaction(customer) 
      } else {
         return createResponse(HttpStatus.BAD_REQUEST, 'Validation failed for customer.');
      }
    }
  ));

    return multipleUpdate;
  }

  async debitBulkTrasacations(debitBulkAmount:any):Promise<AppResponse>{
    const multipleUpdate:any = await Promise.all( debitBulkAmount.map(async (customer) => {
        const validationResponse = await this.validateCustomerTrasactionsData({...customer,"transactionType":"debit"});
  
        if (validationResponse.code === 200) {
          return await this._transactionsTxn.debitTransaction(customer) 
        } else {
           return createResponse(HttpStatus.BAD_REQUEST, 'Validation failed for customer.');
        }
      }
    ));
  
    return multipleUpdate;
  }

  async fetchCustomerTrasactions(accountNumber:string):Promise<AppResponse>{
    return await this._transactionsTxn.fetchCustomerTrasactions(accountNumber);
  }
}
