import { IsString, IsNumber, IsOptional, IsEnum, Matches, MaxLength, Min, IsNotEmpty, IsEmail, IsDateString, IsDate } from 'class-validator';
import { CommonRegExp } from '@app/shared/regex.shared';
import {AccountType} from "@app/core/enums/data-type.enum"
import { ApiProperty } from '@nestjs/swagger';
import { messageFactory, messages } from '@app/shared/messages.shared';
  
  export class CreateBankAccountDto {
    @ApiProperty()
    @IsString()
    @MaxLength(100, { message: messageFactory(messages.W24, ['account Holder Name', '100']) })
    @IsNotEmpty({ message: messageFactory(messages.W2, ['account Holder Name']) })
    @Matches(CommonRegExp.NAME_REGEXP, { message: 'Name must contain only letters, spaces, hyphens, or apostrophes' })
    accountHolderName: string; 
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: messageFactory(messages.W2, ['account Type']) })
    @IsEnum([AccountType.CURRENT, AccountType.SAVINGS, AccountType.FIXED_DEPOSIT], {
		each: true,
		message: messageFactory(messages.W1, ['accountType'])
	})
    accountType: string; 
  
    @ApiProperty()
    @IsNumber({}, { message: messageFactory(messages.W3, ['initial deposit']) })
    @Min(0)
    initialDeposit: number; 
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(100, { message: messageFactory(messages.W24, ['Branch name', '50']) })
    branch?: string; 

    @ApiProperty()
    @IsString()
    @MaxLength(225, { message: messageFactory(messages.W24, ['Address', '225']) })
    @IsNotEmpty({ message: messageFactory(messages.W2, ['address']) })
    address?: string; 

    @ApiProperty()
    @IsString()
    @MaxLength(100, { message: messageFactory(messages.W24, ['nominee name', '100']) })
    @IsNotEmpty({ message: messageFactory(messages.W2, ['nominee Name']) })
    @Matches(CommonRegExp.NAME_REGEXP, { message: 'Name must contain only letters, spaces, hyphens, or apostrophes' })
    nomineeName: string; 
  
    @ApiProperty()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: messageFactory(messages.W2, ['email']) })
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: messageFactory(messages.W2, ['aadhaar Number']) })
    @Matches(CommonRegExp.AADHAR_REGEXP, { message: 'Aadhaar number must be a 12-digit number' })
    aadhaarNumber: string; 
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: messageFactory(messages.W2, ['Pan number']) })
    @Matches(CommonRegExp.PAN_REGEXP, { message: 'PAN number must be in a valid format (e.g., ABCDE1234F)' })
    panNumber: string; 

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: messageFactory(messages.W2, ['phone Number']) })
    @Matches(CommonRegExp.PHONE_REGEXP, { message: 'Phone number must be a valid Indian mobile number' })
    phoneNumber: string; 

    // @ApiProperty({
    //   description: 'Date of birth of the account holder',
    //   example: '1990-01-01',
    // })
    // @IsDate()
    // DateOfBirth: Date;
  }
  
