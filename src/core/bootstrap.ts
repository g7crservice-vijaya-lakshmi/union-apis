import { AppConfigService } from '@app/config/config.service';
import { shouldCompress } from '@app/core/compressions/compression';
import AppLogger from '@app/core/logger/app-logger';
import { ErrorHandler, ResponseHandler } from '@app/core/middleware';
import { setupSwagger } from '@app/core/swagger/doc.swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as cors from 'cors';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { corsOptions } from './cors.config';

/**
 * Core bootstrap module should be loaded here.
 * @param app
 *
 */

export default function bootstrap(app: INestApplication, appConfigSvcObj: AppConfigService) {

	app.setGlobalPrefix('api'); 

	app.use(json({ limit: '50mb' }));
	app.use(urlencoded({ limit: '50mb', extended: true }));
	app.use(helmet()); 
	app.use(
		compression({
			filter: shouldCompress,
			threshold: 0
		})
	); 


	app.use(cors(corsOptions));

	app.useGlobalPipes(
		new ValidationPipe({
		
			whitelist: true,  
			forbidNonWhitelisted: true
		})
	); 


	app.useGlobalInterceptors(new ResponseHandler()); 

	app.useGlobalFilters(new ErrorHandler(app.get(AppLogger))); 

	//Swagger document
	const appConfig = appConfigSvcObj.get('app'),
		{ environment } = appConfig;
	if (environment && environment.toLowerCase() !== 'production') {
		setupSwagger(app);
	}
}
