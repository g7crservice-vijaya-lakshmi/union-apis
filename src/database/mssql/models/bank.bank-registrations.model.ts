import { DataType } from '@app/core/enums/data-type.enum';
import { Column, Model, Table, BelongsTo, ForeignKey, HasMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Schema } from '../connection/schmeas.mssql';
import { Tables } from '../connection/tables.mssql';
import { BankCustomer, BankCustomerColumns } from './bank.customers.model';
import { BankTransaction } from './bank.bank-transactions.model';

const enum BankRegistrationColumns{
    BANKRegistrationId = 'BANKRegistrationId',
    CustomerId = 'CustomerId',
    AccountNumber = 'AccountNumber',
    AccountType = 'AccountType',
    IFSCCode = 'IFSCCode',  
    NomineeName = 'NomineeName', 
    RegistrationStatus = 'RegistrationStatus',
    VerificationDate = 'VerificationDate'  
}

@Table({ tableName: Tables.Tbl_Bank_Registrations, schema: Schema.Bank, timestamps:false})
class BankRegistration extends Model<BankRegistration> {
  
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INT, allowNull: false})
  BANKRegistrationId: number;

  @ForeignKey(() => BankCustomer)  
  @Column({ type: DataType.INT, allowNull: false })
  CustomerId: number;  

  @Column({ type: `${DataType.VARCHAR}(20)`, allowNull: false })
  AccountNumber: string;

  @Column({ type: `${DataType.VARCHAR}(11)`, allowNull: false })
  IFSCCode: string;  

  @Column({ type: `${DataType.VARCHAR}(50)`, allowNull: true })
  NomineeName: string;  

  @Column({ type: `${DataType.VARCHAR}(20)`, allowNull: false })
  AccountType: string;

  @Column({ type: `${DataType.VARCHAR}(20)`, allowNull: false })
  RegistrationStatus: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  RegistrationDate: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  VerificationDate: Date;

  @BelongsTo(() => BankCustomer,{
    foreignKey: BankRegistrationColumns.CustomerId,
		targetKey: BankCustomerColumns.CustomerId
  })
  customer: BankCustomer;

  @HasMany(() => BankTransaction,{
    as:'bankTransactions'
  }) 
  bankTransactions: BankTransaction[];
}

export {BankRegistration, BankRegistrationColumns};


