import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-unionbank-account.dto';
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
      return await this._accountTxn.fetchCustomers();
  }

  async registerAccount(newAcountdata:CreateBankAccountDto):Promise<AppResponse>{
    return await this._accountTxn.registerAccount(newAcountdata);

  }

  findAll() {
    return `This action returns all unionbankAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unionbankAccount`;
  }

  update(id: number, updateUnionbankAccountDto: CreateBankAccountDto) {
    return `This action updates a #${id} unionbankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} unionbankAccount`;
  }
}
