import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnionbankAccountsService } from './unionbank-accounts.service';
import { UpdateUnionbankAccountDto } from './dto/update-unionbank-account.dto';
import AppLogger from '@app/core/logger/app-logger';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AbstractAccountSvc } from './unionbank-account.abstract';

@Controller('unionbank-accounts')
@ApiTags('unionbank-accounts')
export class UnionbankAccountsController {
  constructor(
    private readonly unionbankAccountsService: AbstractAccountSvc,
    private readonly _loggerSvc:AppLogger
  ) {}

  
  @Get()
  findAllCustomers() {
    console.log("Inside Controller")
    return this.unionbankAccountsService.fetchCustomers();
  }

  @Get("registration")
  accountRegistration() {
    return this.unionbankAccountsService.registerAccount();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUnionbankAccountDto: UpdateUnionbankAccountDto) {
  //   return this.unionbankAccountsService.update(+id, updateUnionbankAccountDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.unionbankAccountsService.remove(+id);
  // }
}
