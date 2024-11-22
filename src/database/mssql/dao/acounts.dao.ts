import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { AbstractAccountSqlDao } from "../abstract/accounts.abstract";
import { MsSqlConstants } from "../connection/constants.mssql";
import { BankCustomer, BankCustomerColumns } from "../models/bank.customers.model";
import { BankRegistration, BankRegistrationColumns } from "../models/bank.bank-registrations.model";
import { BankTransaction, BankTransactionColumns } from "../models/bank.bank-transactions.model";
import AppLogger from "@app/core/logger/app-logger";
import { randomBytes } from 'crypto';
import { Sequelize } from "sequelize-typescript";
import { AppResponse, createResponse } from "@app/shared/appresponse.shared";
import { messages } from "@app/shared/messages.shared";
import { CreateBankAccountDto } from "@app/modules/unionbank-accounts/dto/create-unionbank-account.dto";
import { IFSCCode,RegistrationStatus } from "@app/core/enums/data-type.enum";

@Injectable()
export class AccountSqlDao implements AbstractAccountSqlDao{
   constructor(
    @Inject(MsSqlConstants.CUSTOMER_MODEL) private readonly _customers: typeof BankCustomer,
    @Inject(MsSqlConstants.BANK_REGISTRATIONS_MODEL) private readonly _bankRegister: typeof BankRegistration,
    @Inject(MsSqlConstants.BANK_TRANSACTION_MODEL) private readonly _bankTransaction: typeof BankTransaction,
    @Inject(MsSqlConstants.SEQUELIZE_PROVIDER) private readonly _sequelize: Sequelize,
    private readonly _loggerSvc:AppLogger
){}

async fetchCustomers():Promise<AppResponse>{
  const customers = await this._bankRegister.findAll({
   attributes:[BankRegistrationColumns.AccountNumber, BankRegistrationColumns.IFSCCode],
   include:{
      model:this._customers,
      attributes:[BankCustomerColumns.AadhaarNumber,BankCustomerColumns.Address,BankCustomerColumns.BalanceAmount,BankCustomerColumns.CustomerName,BankCustomerColumns.PhoneNumber,BankCustomerColumns.PanNumber]
   }
  });
  return createResponse(HttpStatus.OK, messages.S4, customers); 
}

generateBankAccountNumber(): string {
   const randomBuffer = randomBytes(8); 
   const accountNumber = parseInt(randomBuffer.toString('hex'), 16).toString().slice(0, 16);
   return accountNumber;
 }
 
// async registerAccount(newAcountdata:CreateBankAccountDto):Promise<AppResponse>{
//    try{
//       // const bankAccount = await this._sequelize.transaction(async t =>{
//          const newCustomer = await this._customers.create({
//             CustomerName: 'John Connor',
//             Email: 'john.o\'connor@example.com',
//             Address: '123 Main Street, Apt 101, Downtown',
//             PhoneNumber: '9876543210',
//             AadhaarNumber: '123456789012',
//             PanNumber: 'ABCDE1234F',
//             DateOfBirth: new Date('1990-01-01'),
//             BalanceAmount: 5000.00, // Starting balance
//           });
//          // const customer = await this._customers.create({
//          //    CustomerName: newAcountdata.accountHolderName,
//          //    Email: newAcountdata.email,
//          //    Address: newAcountdata.address,
//          //    PhoneNumber: newAcountdata.phoneNumber,
//          //    AadhaarNumber: newAcountdata.aadhaarNumber,
//          //    PanNumber: newAcountdata.panNumber,
//          //    BalanceAmount: newAcountdata.initialDeposit,
//          //    CreatedDate: new Date(),
//          //    DateOfBirth: newAcountdata.DateOfBirth
//          //  });

//          //  const bankRegistration = await this._bankRegister.create({
//          //    CustomerId:customer.CustomerId,
//          //    AccountNumber: this.generateBankAccountNumber(),
//          //    IFSCCode: IFSCCode.IFSCCode,
//          //    NomineeName: newAcountdata.nomineeName,
//          //    AccountType: newAcountdata.accountType,
//          //    RegistrationStatus: RegistrationStatus.RegistrationStatus,
//          //    VerificationDate: new Date()
//          //  }, { transaction: t });
      
//          //  const bankTransaction = await this._bankTransaction.create({
//          //    BANKRegistrationId:bankRegistration.BANKRegistrationId,
//          //    Amount: newAcountdata.initialDeposit,
//          //    TransactionType: 'Credit',
//          //    TransactionDate: new Date(),
//          //  }, { transaction: t });
      
         
//       //     return { customer };
//       //   });
      
//       //   return createResponse(HttpStatus.OK, messages.S4, bankAccount);
//       return createResponse(HttpStatus.OK, messages.S4, newCustomer);
//    }catch(err){
//       return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
//    }
// }

async registerAccount(newAcountdata:CreateBankAccountDto):Promise<AppResponse>{
   try{
         const newCustomer = await this._customers.create({
            CustomerName: 'John Connor',
            Email: 'john.o\'connor@example.com',
            Address: '123 Main Street, Apt 101, Downtown',
            PhoneNumber: '9876543210',
            AadhaarNumber: '123456789012',
            PanNumber: 'ABCDE1234F',
            BalanceAmount: 500.00, 
          });
      return createResponse(HttpStatus.OK, messages.S4, newCustomer);
   }catch(err){
      console.log(err)
      return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
   }
}

}