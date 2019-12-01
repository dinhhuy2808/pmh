import { Pipe, PipeTransform } from '@angular/core'
@Pipe({name: 'datepipe'})
export class DatePipe implements PipeTransform{
    transform(value:string) : any {
        var date = value.toString();
        var year = date.substring(0, 4)
        var month = date.substring(4, 6)
        var day = date.substring(6, 8)
        return year+'-'+month+'-'+day;
      }
}
