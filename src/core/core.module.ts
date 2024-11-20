import { exportProviders, getProviders, importProviders } from './providers';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
    imports:[...importProviders()],
    providers:[...getProviders()],
    exports:[...exportProviders()]
})
export class CoreModule {}
