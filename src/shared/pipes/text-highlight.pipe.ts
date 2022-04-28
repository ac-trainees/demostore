import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'textHighlight'})

export class TextHighlightPipe implements PipeTransform {

    transform(text: string, searchQuery: string): string {

      if (!searchQuery) {
        return text;
      }

      var regex = new RegExp(searchQuery, 'gi'); //g - global match (find all matches rather than stopping after the first match) / i case-insensitive search
      const match = text.match(regex);

      return text.replace(regex, `<span class="highlight">${match}</span>`);
    }
 }


