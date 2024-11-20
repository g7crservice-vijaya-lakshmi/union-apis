export enum Tables {
    Tbl_Bank_Registrations = "Tbl_Bank_Registrations",
    Tbl_Customers = "Tbl_Customers",
    Tbl_Bank_Transactions = "Tbl_Bank_Transactions",
}

export class TableGroup {
    public static readonly TABLES: Tables[] =[
        Tables.Tbl_Customers,
        Tables.Tbl_Bank_Registrations,
        Tables.Tbl_Bank_Transactions
    ];
}