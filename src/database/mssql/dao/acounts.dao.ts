import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { AbstractAccountSqlDao } from "../abstract/accounts.abstract";
import { MsSqlConstants } from "../connection/constants.mssql";
import { BankCustomer } from "../models/bank.customers.model";
import { BankRegistration } from "../models/bank.bank-registrations.model";
import { BankTransaction } from "../models/bank.bank-transactions.model";
import AppLogger from "@app/core/logger/app-logger";
import { Sequelize } from "sequelize-typescript";
import { AppResponse, createResponse } from "@app/shared/appresponse.shared";
import { messages } from "@app/shared/messages.shared";

@Injectable()
export class AccountSqlDao implements AbstractAccountSqlDao{
   constructor(
    @Inject(MsSqlConstants.CUSTOMER_MODEL) private readonly _customers: typeof BankCustomer,
    @Inject(MsSqlConstants.BANK_TRANSACTION_MODEL) private readonly _bankRegister: typeof BankRegistration,
    @Inject(MsSqlConstants.BANK_TRANSACTION_MODEL) private readonly _bankTransaction: typeof BankTransaction,
    @Inject(MsSqlConstants.SEQUELIZE_PROVIDER) private readonly _sequelize: typeof Sequelize,
    private readonly _loggerSvc:AppLogger
){}

async fetchCustomers():Promise<AppResponse>{
   console.log("Inside Dao");
  const customers = await this._customers.findAll();
  return createResponse(HttpStatus.OK, messages.S4, customers); 
}
async registerAccount():Promise<AppResponse>{
   const accountsData = await this._bankRegister.findAll();
   return createResponse(HttpStatus.OK, messages.S4, accountsData)

}

}