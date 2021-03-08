import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

import { User } from '../interfaces';
import { GitUserService } from './../services/git-user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  public viewType: 'list' | 'grid' = 'list';
  public search = new FormControl();
  public searchedUsers$: Observable<User[]>;

  constructor(
    public userService: GitUserService
  ) {
    this.searchedUsers$ = this.search.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        filter(s => s.length),
        switchMap(q => this.userService.getUsers({ q, per_page: 5 })),
      );
  }

}
