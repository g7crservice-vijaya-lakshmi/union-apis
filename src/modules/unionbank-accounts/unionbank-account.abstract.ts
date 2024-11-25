import { AppResponse } from "@app/shared/appresponse.shared";
import { CreateBankAccountDto } from "./dto/create-unionbank-account.dto";

export abstract class AbstractAccountSvc{
    abstract fetchCustomers():Promise<AppResponse>;
    abstract registerAccount(newAccount: CreateBankAccountDto):Promise<AppResponse>;
}