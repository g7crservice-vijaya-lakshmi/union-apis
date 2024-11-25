import { CreateBankAccountDto } from "@app/modules/unionbank-accounts/dto/create-unionbank-account.dto";
import { AppResponse } from "@app/shared/appresponse.shared";

export abstract class AbstractAccountSqlDao{
    abstract fetchCustomers():Promise<AppResponse>;
    abstract registerAccount(newAcountdata:CreateBankAccountDto):Promise<AppResponse>;
}