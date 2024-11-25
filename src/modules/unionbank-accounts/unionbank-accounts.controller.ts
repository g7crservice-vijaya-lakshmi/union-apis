import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import AppLogger from '@app/core/logger/app-logger';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AbstractAccountSvc } from './unionbank-account.abstract';
import { CreateBankAccountDto } from './dto/create-unionbank-account.dto';

@Controller('unionbank-accounts')
@ApiTags('unionbank-accounts')
export class UnionbankAccountsController {
  constructor(
    private readonly unionbankAccountsService: AbstractAccountSvc,
    private readonly _loggerSvc:AppLogger
  ) {}

  @Post('bank')
  accountRegistration(@Body() newAccount: CreateBankAccountDto) {
    return this.unionbankAccountsService.registerAccount(newAccount)
  } 

  @Get()
  findAllCustomers() {
    return this.unionbankAccountsService.fetchCustomers();
  }
}
