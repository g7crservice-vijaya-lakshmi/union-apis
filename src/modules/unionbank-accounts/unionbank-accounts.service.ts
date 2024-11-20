import { Injectable } from '@nestjs/common';
import { CreateUnionbankAccountDto } from './dto/create-unionbank-account.dto';
import { UpdateUnionbankAccountDto } from './dto/update-unionbank-account.dto';
import { AbstractAccountSvc } from './unionbank-account.abstract';
import { AbstractAccountSqlDao } from '@app/database/mssql/abstract/accounts.abstract';
import { DatabaseService } from '@app/database/database.service';
import { AppResponse } from '@app/shared/appresponse.shared';

@Injectable()
export class UnionbankAccountsService implements AbstractAccountSvc{
  private readonly _accountTxn:AbstractAccountSqlDao;
  constructor(readonly _dbSvc: DatabaseService){
    this._accountTxn = _dbSvc.accountSqlTxn;
  }

  
  async fetchCustomers():Promise<AppResponse>{
      console.log("Inside Service")
      return await this._accountTxn.fetchCustomers();
  }

  async registerAccount():Promise<AppResponse>{
    return await this._accountTxn.fetchCustomers();

  }

  findAll() {
    return `This action returns all unionbankAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unionbankAccount`;
  }

  update(id: number, updateUnionbankAccountDto: UpdateUnionbankAccountDto) {
    return `This action updates a #${id} unionbankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} unionbankAccount`;
  }
}
