import { AppResponse } from "@app/shared/appresponse.shared";
import { CreditTransactionDto, DebitTransactionDto } from "./dto/create-account-transaction.dto";

export abstract class AbstractAccountTransactionSvc{
    abstract creditTransaction(creaditAmount:CreditTransactionDto):Promise<AppResponse>;
    abstract debitTransaction(debitAmount:DebitTransactionDto):Promise<AppResponse>;
    abstract creditBulkTrasacations(creditBulkAmount:any,batchSize:number):Promise<AppResponse>;
    abstract debitBulkTrasacations(debitBulkAmount:any,batchSize:number):Promise<AppResponse>;
    abstract fetchCustomerTrasactions(accountNumber:string):Promise<AppResponse>;
}