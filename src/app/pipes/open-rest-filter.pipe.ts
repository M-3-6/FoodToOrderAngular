import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'openRestFilter'
})
export class OpenRestFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
