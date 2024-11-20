export class AppConfigService {
    private readonly envConfig:{[key:string]:any} ={};
    constructor(){
        this.envConfig.app = {
			port: parseInt(process.env.APP_PORT, 10) || 8080,
			environment: process.env.ENVIRONMENT
		};

        this.envConfig.db = {
			mssql: {
				dialect: 'mssql',
				database: process.env.MSSQL_DATABASE,
				username: process.env.MSSQL_USERNAME,
				password: process.env.MSSQL_PASSWORD,
				host: process.env.MSSQL_SERVER,
				port: Number(process.env.MSSQL_PORT),
				trustServerCertificate: Boolean(process.env.MSSQL_TRUST_SERVER_CERTIFICATE),
			}
		};

		/*logger*/
		this.envConfig.logger = {
			logLevel: process.env.LOG_LEVEL
		};

    }
    get(key: string): any {
		return this.envConfig[key];
	}
}




































// autoLoadModels: true,
				// synchronize:true,
				// dialectOptions:{
				// 	options: {
				// 		trustServerCertificate: true, 
				// 		trustedConnection: true,
				// 		encrypt: true,  
				// 		enableArithAbort: true,  
				// 	  },
				// }