import { AppConfigService } from "@app/config/config.service";
import AppLogger from "@app/core/logger/app-logger";
import { MsSqlConstants } from "./constants.mssql";
import { messageFactory, messages } from "@app/shared/messages.shared";
import {Sequelize} from "sequelize-typescript";
import { models } from "./models.connection.mssql";
import { SchemaGrp } from "./schmeas.mssql";

export const sequelizeProvider = [
   {
    provide:MsSqlConstants.SEQUELIZE_PROVIDER,
    useFactory:async(_appConfigSvc:AppConfigService, _logger:AppLogger) =>{
        const sequelize:Sequelize = null;

        try{
          const dbConfig = _appConfigSvc.get('db').mssql,
          sequelize = new Sequelize({...dbConfig});
          for (const schemaName of SchemaGrp.ALL_SCHEMAS) {
				await sequelize.createSchema(schemaName, {});
			}
          sequelize.addModels([...models]);
          await sequelize.sync(); //{force:true}
          _logger.log(messages.S3, 200);
          return sequelize;
        }catch(err){
            _logger.log(messageFactory(messages.E4, [err.stack]), 200);
        }

        finally{
            process.on('SIGINT', async()=>{
                if(sequelize){
                    try{
                       await sequelize.close();
                       _logger.log(messages.E5, 200);
                    }catch(err){
                        _logger.log(messageFactory(messages.E6, [err.stack]), 500);
                    } finally{
                        process.exit(0);
                    }
                }
            });
        }
    },
    inject:[AppConfigService, AppLogger]
   }
];
