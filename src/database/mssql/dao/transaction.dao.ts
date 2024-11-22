import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { MsSqlConstants } from "../connection/constants.mssql";
import { BankCustomer, BankCustomerColumns } from "../models/bank.customers.model";
import { BankRegistration, BankRegistrationColumns } from "../models/bank.bank-registrations.model";
import { BankTransaction, BankTransactionColumns} from "../models/bank.bank-transactions.model";
import AppLogger from "@app/core/logger/app-logger";
import { Sequelize } from "sequelize-typescript";
import { AppResponse, createResponse } from "@app/shared/appresponse.shared";
import { messages } from "@app/shared/messages.shared";
import { AbstractAccountTransactionSQlDao } from "../abstract/transaction.abstract";
import { CreditTransactionDto, DebitTransactionDto } from "@app/modules/account-transaction/dto/create-account-transaction.dto";

@Injectable()
export class TrasactionSqlDao implements AbstractAccountTransactionSQlDao {
  constructor(
    @Inject(MsSqlConstants.CUSTOMER_MODEL) private readonly _customers: typeof BankCustomer,
    @Inject(MsSqlConstants.BANK_REGISTRATIONS_MODEL) private readonly _bankRegister: typeof BankRegistration,
    @Inject(MsSqlConstants.BANK_TRANSACTION_MODEL) private readonly _bankTransaction: typeof BankTransaction,
    @Inject(MsSqlConstants.SEQUELIZE_PROVIDER) private _sequelize: Sequelize,
    private readonly _loggerSvc: AppLogger
  ) { }

  async fetchTrasactionData(customerId): Promise<AppResponse> {
    const fetchAccountData = await this._customers.findOne({
      where: {
        [BankCustomerColumns.CustomerId]: customerId
      },
    });
    return createResponse(HttpStatus.OK, messages.S4, fetchAccountData);
  }

  async fetchCustomerAccountDetails(accountNumber: string): Promise<AppResponse> {
    try {
      const customerData = await this._bankRegister.findOne({
        attributes: ['BANKRegistrationId', 'AccountNumber', 'IFSCCode'],
        include: [
          {
            model: this._customers,
            attributes: ['CustomerId', 'CustomerName', 'Email', 'PhoneNumber', 'Address', 'BalanceAmount'],
          }
        ],
        where: {
          AccountNumber: accountNumber,
        }
      });

      return createResponse(HttpStatus.OK, messages.S4, customerData);
    } catch (err) {
      return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
    }

  }

  async creditTransaction(creditAmount: CreditTransactionDto): Promise<AppResponse> {
    try {
      const data = await this._sequelize.transaction(async t => {
        const fetchAccountData = await this._customers.update(
          {
            [BankCustomerColumns.BalanceAmount]: this._customers.sequelize.literal(
              `${BankCustomerColumns.BalanceAmount} + ${creditAmount.amount}`
            ),
          },
          {
            where: {
              [BankCustomerColumns.CustomerName]: creditAmount.CustomerName,

            }
          }
        );

        if (fetchAccountData[0] === 0) {
          return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
        }

        const bankRegistrationData = await this.fetchCustomerAccountDetails(creditAmount.accountNumber);

        await this._bankTransaction.create({
          Amount: creditAmount.amount,
          TransactionType: 'Credit',
          BANKRegistrationId: bankRegistrationData.data.BANKRegistrationId,
        })
        
        t.afterCommit(() => {
          this._loggerSvc.log(messages.S4, 200);
        }); 

        return bankRegistrationData;
      });
      return createResponse(HttpStatus.OK, messages.S29, data.data.customer.BalanceAmount);
    } catch (err) {
      return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
    }
  }

  async debitTransaction(debitAmountCustomer: DebitTransactionDto): Promise<AppResponse> {
    try {
      const data = await this._sequelize.transaction(async t => {
        const debitAmount = await this._customers.update({
          [BankCustomerColumns.BalanceAmount]: this._customers.sequelize.literal(
            `${BankCustomerColumns.BalanceAmount} - ${debitAmountCustomer.amount}`
          )
        },
          {
            where: {
              [BankCustomerColumns.CustomerName]: debitAmountCustomer.CustomerName
            }
          }
        );

        if (debitAmount[0] === 0) {
          throw new Error('No customer found or balance update failed');
        }

        const bankRegistrationData = await this.fetchCustomerAccountDetails(debitAmountCustomer.accountNumber);

        await this._bankTransaction.create({
          Amount: debitAmountCustomer.amount,
          TransactionType: 'Debit',
          BANKRegistrationId: bankRegistrationData.data.BANKRegistrationId,
        })
         
        t.afterCommit(() => {
            this._loggerSvc.log(messages.S4, 200);
        });

        return bankRegistrationData
      });
      return createResponse(HttpStatus.OK, messages.S30, data.data.customer.BalanceAmount);
    } catch (err) {
      return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
    }
  }

  async fetchCustomerTrasactions(accountNumber:string):Promise<AppResponse>{
    const customersTrasactions = await this._bankTransaction.findAll({
      attributes:[BankTransactionColumns.Amount,BankTransactionColumns.TransactionType],
      include:{
        model:this._bankRegister,
        attributes:[BankRegistrationColumns.AccountNumber,BankRegistrationColumns.AccountType,BankRegistrationColumns.IFSCCode]
      }
    })
  return createResponse(HttpStatus.OK, messages.S4, customersTrasactions);
  } 
}
