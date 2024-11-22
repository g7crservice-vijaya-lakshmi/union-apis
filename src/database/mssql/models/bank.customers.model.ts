import { DataType } from '@app/core/enums/data-type.enum';
import { Column, Model, Table, HasMany, PrimaryKey, AutoIncrement, HasOne,DataType as Dt } from 'sequelize-typescript';
import { Schema } from '../connection/schmeas.mssql';
import { Tables } from '../connection/tables.mssql';
import { BankRegistration } from './bank.bank-registrations.model'; 
import { BankTransaction } from './bank.bank-transactions.model'; 

const enum BankCustomerColumns {
  CustomerId = 'CustomerId',
  CustomerName = 'CustomerName',
  Email = 'Email',
  Address = 'Address',
  PhoneNumber = 'PhoneNumber',
  PanNumber ='PanNumber',
  AadhaarNumber = 'AadhaarNumber',
  DateOfBirth = 'DateOfBirth',
  BalanceAmount = 'BalanceAmount',
  CreatedDate = 'CreatedDate',
}

@Table({ tableName: Tables.Tbl_Customers, schema: Schema.Bank, timestamps: false })
class BankCustomer extends Model<BankCustomer> {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INT, allowNull: false })
  CustomerId: number;

  @Column({ type: `${DataType.VARCHAR}(70)`, allowNull: false,unique: true  })
  CustomerName: string;

  @Column({ type: `${DataType.VARCHAR}(50)`, allowNull: false })
  Email: string;

  @Column({ type: `${DataType.VARCHAR}(255)`, allowNull: true })
  Address: string;

  @Column({ type: `${DataType.VARCHAR}(10)`, allowNull: false })
  PhoneNumber: string;  

  @Column({ type: `${DataType.VARCHAR}(12)`, allowNull: false })
  AadhaarNumber: string;

  @Column({ type: `${DataType.VARCHAR}(20)`, allowNull: false })
  PanNumber: string;  

  // @Column({ type: DataType.DATE, allowNull: false })
  // DateOfBirth: Date;

  // @Column({ type: DataType.DATE, defaultValue: new Date() })
  // CreatedDate: Date;

  @Column({ type: Dt.DECIMAL(18, 2), allowNull: false, defaultValue: 0.00,validate: {
    isPositive(value: number) {
      if (value < 0) {
        throw new Error('BalanceAmount cannot be negative');
      }
    }
  }
  })
  BalanceAmount: number;

  @HasOne(() => BankRegistration,{
    as:'bankRegistration'
  })
  bankRegistration: BankRegistration;

  // @HasMany(() => BankTransaction,{
  //   as:'bankTransactions'
  // })
  // bankTransactions: BankTransaction[];
}

export { BankCustomer, BankCustomerColumns };

