// schema.enum.ts

export enum Schema {
    Bank ="bank",
    Users = 'Users',              
    Accounts = 'Accounts',         
    Transactions = 'Transactions', 
    AuditLogs = 'AuditLogs',        
    Loans = 'Loans',               
    Notifications = 'Notifications' 
  }
  
  
  export class SchemaGrp {
    static readonly ALL_SCHEMAS: Schema[] = [
      Schema.Bank,
      Schema.Users,
      Schema.Accounts,
      Schema.Transactions,
      Schema.AuditLogs,
      Schema.Loans,
      Schema.Notifications
    ];
  }
  