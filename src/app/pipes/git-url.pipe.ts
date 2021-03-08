import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gitUrl'
})
export class GitUrlPipe implements PipeTransform {

  transform(value: string): string {
    return `https://github.com/${value}`;
  }

}
