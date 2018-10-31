import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'splitLast' })

export class SplitLastPipe implements PipeTransform {
    transform(input: string, separator: string,index:number): string {
        return input.split(separator)[index];
    }
}