import { EventExceptionHandler, Injectable } from '@watsonjs/common';

@Injectable()
export class <%= classify(name) %>Handler extends EventExceptionHandler {
  constructor() {
    super('ExceptionClass' as any);
  }

  catch(err: unknown) {
    
  }
}
