import { ConfigService } from '@watsonjs/common';
import { WatsonFactory } from '@watsonjs/core';

import { AppModule } from './app.module';

export const bootstrap = async () => {
  const app = await WatsonFactory.create(AppModule);

  const configService = app.getProviderInstance(ConfigService);
  const token = configService.get("DISCORD_TOKEN");

  app.setAuthToken(token);

  app.start().then(() => console.log("ready"));
};

bootstrap();
