import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UserSearchPipe', pure: false })
export class UserSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
        console.log(value, 'v');

        return value.filter(user => {
            console.log(value, 'useruser');
            if (user.refrence_by) {
            return user.refrence_by.search(searchText) !== -1;
            }
            else{
              return user.post_days.search(searchText) !== -1;
            }
      });
    }
  }
}