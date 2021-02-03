import { ConfigModule, Module } from '@watsonjs/common';

import { AppReceiver } from './app.receiver';
import { AppService } from './app.service';

@Module({
  providers: [AppService],
  receivers: [AppReceiver],
  imports: [
    ConfigModule.forConfig({
      dotEnv: { path: `${__dirname}/../.env` },
    }),
  ],
})
export class AppModule {}
