import { DataType } from '@app/core/enums/data-type.enum';
import { Column, Model, Table, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Schema } from '../connection/schmeas.mssql';
import { Tables } from '../connection/tables.mssql';
import { BankRegistration, BankRegistrationColumns } from './bank.bank-registrations.model';
import { Sequelize } from 'sequelize-typescript';

const enum BankTransactionColumns {
  TransactionId = 'TransactionId',
  BANKRegistrationId = 'BANKRegistrationId',
  Amount = 'Amount',
  TransactionType = 'TransactionType',
  TransactionDate = 'TransactionDate'
}

@Table({ tableName: Tables.Tbl_Bank_Transactions, schema: Schema.Bank, timestamps: false })
class BankTransaction extends Model<BankTransaction> {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INT, allowNull: false })
  TransactionId: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  Amount: number;

  @Column({ type: `${DataType.VARCHAR}(20)`, allowNull: false })
  TransactionType: string;

  @Column({ type: DataType.DATE, defaultValue: Sequelize.literal('GETDATE()') })
  TransactionDate: Date;

  @ForeignKey(() => BankRegistration)
  @Column({ type: DataType.INT, allowNull: false })
  [BankTransactionColumns.BANKRegistrationId]: number;

  @BelongsTo(() => BankRegistration, {
    foreignKey: BankTransactionColumns.BANKRegistrationId,
    targetKey: BankRegistrationColumns.BANKRegistrationId
  })
  bankRegistration: BankRegistration;

}

export { BankTransaction, BankTransactionColumns }


