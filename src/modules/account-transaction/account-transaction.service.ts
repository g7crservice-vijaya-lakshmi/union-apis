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

  async validateCustomerTrasactionsData(creaditAmount:CreditTransactionDto){
      const customerAccountData = await this._transactionsTxn.fetchCustomerAccountDetails(creaditAmount.accountNumber);
       if(!customerAccountData) return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);

      if(customerAccountData.data.customer.CustomerName !== creaditAmount.CustomerName){
       return createResponse(HttpStatus.BAD_REQUEST, messageFactory(messages.E13, ['CustomerName']));
      }
    
      if(creaditAmount.transactionType === "debit"){
        if (creaditAmount.amount > customerAccountData.data.customer.BalanceAmount) {
           return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
        }
      }
      return customerAccountData;
  }

  async creditTransaction(creaditAmount:CreditTransactionDto):Promise<AppResponse> {
    const validateData = await this.validateCustomerTrasactionsData(creaditAmount);
    if(validateData.code !== 200) {
      return validateData;
    }
    return await this._transactionsTxn.creditTransaction(creaditAmount);
  }

  async debitTransaction(debitAmount:DebitTransactionDto):Promise<AppResponse> {
    const validateData = await this.validateCustomerTrasactionsData({...debitAmount,"transactionType":"debit"});
    if(validateData.code !== 200) {
      return validateData;
    }
    return await this._transactionsTxn.debitTransaction(debitAmount);
  }


  // async creditBulkTrasacations(creditBulkAmount:CreditTransactionDto[]):Promise<AppResponse>{
  //   const multipleUpdate:any = await Promise.all(creditBulkAmount.map(async (customer) => {
  //     const validationResponse = await this.validateCustomerTrasactionsData(customer);

  //     if (validationResponse.code !== 200) {
  //       return Promise.reject(createResponse(HttpStatus.BAD_REQUEST, 'Validation failed for customer.'));
  //     } 
  //     return customer;
  //   }
  // ));
  //   return await this._transactionsTxn.creditBulkAmountOfData(multipleUpdate);
  // }

  async debitBulkTrasacations(debitBulkAmount:any,batchSize:number):Promise<AppResponse>{
    // const multipleUpdate:any = await Promise.all( debitBulkAmount.map(async (customer) => {
    //     const validationResponse = await this.validateCustomerTrasactionsData({...customer,transactionType:"debit"});

    //     if (validationResponse.code === 200) {
    //       const data =  await this._transactionsTxn.debitTransaction(customer) 
    //       if(data.code !== 200){
    //         return {AccountNumber:customer.accountNumber, data:"amount debit failed"};
    //       }
    //       return {totalAmmount:data.data,AccountNumber:customer.accountNumber};
    //     } else {
    //        return createResponse(HttpStatus.BAD_REQUEST, 'Validation failed for customer.');
    //     }
    //   }
    // ));
  
    // return createResponse(HttpStatus.OK, messages.S30, multipleUpdate);
    const multipleUpdate:any = [];
    for (let i = 0; i < debitBulkAmount.length; i += batchSize) {
      const batch = debitBulkAmount.slice(i, i + batchSize);
  
      const batchResults = await Promise.all(
        batch.map(async (customer) => {
          const validationResponse = await this.validateCustomerTrasactionsData(customer);
  
          if (validationResponse.code !== 200) {
            throw createResponse(
              HttpStatus.BAD_REQUEST,
              `Validation failed for customer ID: ${customer.accountNumber}`
            );
          }
          return customer;
        })
      );
  
      multipleUpdate.push(...batchResults);
    }
  
    return await this._transactionsTxn.debitBulkAmountOfData(multipleUpdate,batchSize);
  }

  async fetchCustomerTrasactions(accountNumber?:string):Promise<AppResponse>{
    return await this._transactionsTxn.fetchCustomerTrasactions(accountNumber);
  }

  async creditBulkTrasacations(creditBulkAmount:CreditTransactionDto[],batchSize:number):Promise<AppResponse>{
    const multipleUpdate:any = [];
      for (let i = 0; i < creditBulkAmount.length; i += batchSize) {
        const batch = creditBulkAmount.slice(i, i + batchSize);
    
        const batchResults = await Promise.all(
          batch.map(async (customer) => {
            const validationResponse = await this.validateCustomerTrasactionsData(customer);
    
            if (validationResponse.code !== 200) {
              throw createResponse(
                HttpStatus.BAD_REQUEST,
                `Validation failed for customer ID: ${customer.accountNumber}`
              );
            }
            return customer;
          })
        );
    
        multipleUpdate.push(...batchResults);
      }
    
      return await this._transactionsTxn.creditBulkAmountOfData(multipleUpdate,batchSize);
    }
  }

