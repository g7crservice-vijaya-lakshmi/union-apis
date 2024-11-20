import { AppResponse } from "@app/shared/appresponse.shared";

export abstract class AbstractAccountSvc{
    abstract fetchCustomers():Promise<AppResponse>;
    abstract registerAccount():Promise<AppResponse>;
}