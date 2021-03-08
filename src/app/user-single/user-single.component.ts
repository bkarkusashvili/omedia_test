import { catchError, startWith, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { UserWithRepo } from '../interfaces';

import { GitUserService } from '../services/git-user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.scss']
})
export class UserSingleComponent {

  public user$: Observable<UserWithRepo | null>;

  constructor(
    private userService: GitUserService,
    private activeRoute: ActivatedRoute,
  ) {
    const username = this.activeRoute.snapshot.paramMap.get('username') as string;

    this.user$ = this.userService.getUser(username, true)
      .pipe(
        catchError((err: HttpErrorResponse) => err.status === 404 ? of(null) : throwError(err))
      );
  }

}
