import { PartialType } from '@nestjs/swagger';
import { CreateUnionbankAccountDto } from './create-unionbank-account.dto';

export class UpdateUnionbankAccountDto extends PartialType(CreateUnionbankAccountDto) {}
