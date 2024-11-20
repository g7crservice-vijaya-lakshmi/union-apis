import { Injectable } from '@nestjs/common';
import { AbstractAccountSqlDao } from './mssql/abstract/accounts.abstract';
import { AbstractAccountTransactionSQlDao } from './mssql/abstract/transaction.abstract';

@Injectable()
export class DatabaseService {
    constructor(
        public accountSqlTxn:AbstractAccountSqlDao,
        public trascationSqlTxn:AbstractAccountTransactionSQlDao
    ){}
}
