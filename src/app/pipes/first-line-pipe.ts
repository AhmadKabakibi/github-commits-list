import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLine'
})

export class FirstLinePipe implements PipeTransform {
  transform(str: string): string {
    const lines = str ? str.split('\n') : [];
    return lines.length ? lines[0] : str;
  }
}
