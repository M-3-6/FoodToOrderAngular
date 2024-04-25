import { Pipe, PipeTransform } from '@angular/core';
import { Restaurant } from '../models/restaurant';

@Pipe({
  name: 'openRestFilter',
  pure: false
})
export class OpenRestFilterPipe implements PipeTransform {

  transform(restaurants:Restaurant[] ): Restaurant[] {
    if(restaurants==null){
      return restaurants;
    }
    return restaurants.filter(rest=>rest.isOpen==true)
  }

}
