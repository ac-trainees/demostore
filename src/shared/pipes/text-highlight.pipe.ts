import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'appTextHighlight'})

export class TextHighlightPipe implements PipeTransform {

    transform(text: any, search: any): any {
    }

}
