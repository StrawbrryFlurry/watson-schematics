import { ExecutionContext, Injectable, PipeTransform } from '@watsonjs/common';

@Injectable()
export class <%= classify(name) %>Pipe implements PipeTransform {
  transform(ctx: ExecutionContext) {
    return;
  }
}
