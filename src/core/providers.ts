import { AppConfigService } from '@app/config/config.service';
import { DatabaseModule } from '@app/database/database.module';
import { ConfigModule } from '@nestjs/config';
import AppLogger from './logger/app-logger';

const getProviders = (): any[] => {
		return [
			AppConfigService,
			AppLogger,
		];
	},
	importProviders = (): any[] => {
		return [ConfigModule.forRoot({ envFilePath: '.env' }), DatabaseModule];
	},
	exportProviders = (): any[] => {
		return [AppConfigService, AppLogger, DatabaseModule];
	};

export { exportProviders, getProviders, importProviders };
