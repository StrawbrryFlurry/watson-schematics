import { Command, Receiver } from '@watsonjs/common';

import { AppService } from './app.service';

@Receiver({
  prefix: "!",
})
export class AppReceiver {
  constructor(private readonly appService: AppService) {}

  @Command({ command: "ping", alias: ["hey"] })
  public handlePing() {
    return this.appService.ping();
  }
}
