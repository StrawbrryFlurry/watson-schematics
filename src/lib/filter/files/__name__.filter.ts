import { ExecutionContext, Filter, Injectable } from '@watsonjs/common';

@Injectable()
export class <%= classify(name) %>Filter implements Filter {
  filter(ctx: ExecutionContext) {
    
    return true;
  }
}
