import { AppResponse } from "@app/shared/appresponse.shared";

export abstract class AbstractAccountSqlDao{
    abstract fetchCustomers():Promise<AppResponse>;
    abstract registerAccount():Promise<AppResponse>;
}