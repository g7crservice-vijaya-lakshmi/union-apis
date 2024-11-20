import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import AppLogger from './core/logger/app-logger';
import coreBootstrap from "@app/core/bootstrap";
import { messageFactory, messages } from './shared/messages.shared';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule),
  configObj = app.get(AppConfigService),
  logger = app.get(AppLogger),
  appConfig = configObj.get('app'),
  {port} = appConfig;
  
  try{
    coreBootstrap(app, configObj);
    await app.listen(port, ()=>{
      const successMsg = messageFactory(messages.S1, [port]);
      logger.log(successMsg, 200);
    })
  }catch(err){
    const errMsg = messageFactory(messages.E1, [err.message]);
    logger.error(errMsg, 500);
  }
}

bootstrap();
