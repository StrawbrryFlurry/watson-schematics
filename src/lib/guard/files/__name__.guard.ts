import { CanActivate, ExecutionContext, Injectable } from '@watsonjs/common';

@Injectable()
export class <%= classify(name) %>Guard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    
    return true;
  }
}
