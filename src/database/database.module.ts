import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { sequelizeProvider } from './mssql/connection/connection.mssql';
import { msSqlDBModelsProvider } from './mssql/connection/models.connection.mssql';
import { AbstractAccountSqlDao } from './mssql/abstract/accounts.abstract';
import { AccountSqlDao } from './mssql/dao/acounts.dao';
import { Sequelize } from 'sequelize-typescript';
import { AbstractAccountTransactionSQlDao } from './mssql/abstract/transaction.abstract';
import { TrasactionSqlDao } from './mssql/dao/transaction.dao';

@Module({
  providers: [
    ...sequelizeProvider,
    ...msSqlDBModelsProvider,
    DatabaseService,
    {
      provide:AbstractAccountSqlDao,
      useClass:AccountSqlDao
    },
    {
      provide:AbstractAccountTransactionSQlDao,
      useClass:TrasactionSqlDao
    }
  ],
  exports: [
    DatabaseService,
    ...msSqlDBModelsProvider,
    {
      provide:AbstractAccountSqlDao,
      useClass:AccountSqlDao
    },
    {
      provide:AbstractAccountTransactionSQlDao,
      useClass:TrasactionSqlDao
    }
  ]
})
export class DatabaseModule {}
