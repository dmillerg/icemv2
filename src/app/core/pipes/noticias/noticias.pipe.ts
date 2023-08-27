import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noticias'
})
export class NoticiasPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
