import { EventException } from '@watsonjs/common';

export class <%= classify(name) %>Exception extends EventException {
  constructor() {
    super("Message");
  }
}
