import { Injectable, Pipe } from '@angular/core';


@Pipe({
  name: 'daysAgo'
})
@Injectable()
export class DaysAgo {
  transform(value: Date, args: any[]) {
    let oneDay = 24 * 60 * 60 * 1000;
    return  Math.round(Math.abs((value.getTime() - new Date().getTime())/(oneDay)));
  }
}
