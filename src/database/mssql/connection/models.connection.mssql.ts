import { MsSqlConstants } from "./constants.mssql";
import { BankRegistration } from "../models/bank.bank-registrations.model";
import { BankTransaction } from "../models/bank.bank-transactions.model";
import { BankCustomer } from "../models/bank.customers.model";

const msSqlDBModelsProvider = [
    {
        provide:MsSqlConstants.CUSTOMER_MODEL,
        useValue: BankCustomer
    },
    {
        provide:MsSqlConstants.BANK_REGISTRATIONS_MODEL,
        useValue: BankRegistration
    },
    {
        provide:MsSqlConstants.BANK_TRANSACTION_MODEL,
        useValue: BankTransaction
    },
],
models:any = msSqlDBModelsProvider.map((providers) => providers.useValue);
export {models, msSqlDBModelsProvider};

 