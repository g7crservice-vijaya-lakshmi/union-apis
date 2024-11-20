import { CreditTransactionDto, DebitTransactionDto } from "@app/modules/account-transaction/dto/create-account-transaction.dto";
import { AppResponse } from "@app/shared/appresponse.shared";

export abstract class AbstractAccountTransactionSQlDao{
    abstract creditTransaction(creaditAmount:CreditTransactionDto):Promise<AppResponse>;
    abstract debitTransaction(debitAmount:DebitTransactionDto):Promise<AppResponse>;
    abstract fetchTrasactionData(regId:number):Promise<AppResponse>;
    abstract fetchCustomerAccountDetails(accountNumber:string):Promise<AppResponse>;
    abstract fetchCustomerTrasactions(accountNumber:string):Promise<AppResponse>;
}