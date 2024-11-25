import { messageFactory, messages } from '@app/shared/messages.shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate, IsNumber, IsString, IsDateString, IsNotEmpty,Min,IsPositive } from 'class-validator';

export class CreditTransactionDto {
  @ApiProperty()
  @IsNotEmpty({ message: messageFactory(messages.W2, ['accountNumber']) })
  @IsString()
  readonly accountNumber: string;  

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: messageFactory(messages.W2, ['customer Name']) })
  readonly CustomerName: string;  
  
  @ApiProperty()
  @IsNotEmpty({ message: messageFactory(messages.W2, ['accountNumber']) })
  @IsNumber({}, { message: messageFactory(messages.W3, ['amount']) })
  @Min(1, { message: messageFactory(messages.W3, ['amount must be greater than 0']) })
  @IsPositive()
  readonly amount: number;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly transactionType?: string = 'credit';  

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  readonly transactionDate?: string;
}

export class DebitTransactionDto {
  @ApiProperty()
  @IsNotEmpty({ message: messageFactory(messages.W2, ['accountNumber']) })
  @IsString()
  readonly accountNumber: string;  
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: messageFactory(messages.W2, ['customer Name']) })
  readonly CustomerName: string;  
  
  @ApiProperty()
  @IsNotEmpty({ message: messageFactory(messages.W2, ['accountNumber']) })
  @IsNumber({}, { message: messageFactory(messages.W3, ['amount']) })
  @Min(1, { message: messageFactory(messages.W3, ['amount must be greater than 0']) })
  @IsPositive({ message: messageFactory(messages.W3, ['amount must be greater than 0']) })
  readonly amount: number;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly transactionType?: string = 'debit';  

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  readonly transactionDate?: string;
}