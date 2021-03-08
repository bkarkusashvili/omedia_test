import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

import { Users, UserFull, Filter, UserWithRepo, Repository, User, Organization } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GitUserService {

  private api = 'https://api.github.com';

  public popularUsers$: Observable<UserWithRepo[]>;

  constructor(
    private http: HttpClient
  ) {
    this.popularUsers$ = this.getPopularUsers().pipe(
      debounceTime(1000 * 60 * 10),
      switchMap(res => combineLatest(res))
    );
  }

  get lastSearch(): string[] {
    const stored = localStorage.getItem('search');

    return stored ? JSON.parse(stored) : [];
  }

  addSearch(username: string): void {
    const stored = localStorage.getItem('search');
    let searchs: string[] = (stored ? JSON.parse(stored) : []);
    searchs = searchs.filter(item => item !== username).slice(0, 2);

    searchs.unshift(username);

    localStorage.setItem('search', JSON.stringify(searchs));
  }

  getPopularUsers(): Observable<Observable<UserWithRepo>[]> {
    const params = new HttpParams().appendAll({
      q: 'followers:>1000',
      per_page: '8',
      sort: 'followers'
    });

    return this.http.get<Users>(`${this.api}/search/users`, { params })
      .pipe(
        map(res => res.items.map(user => this.getUser(user.login))),
      );
  }

  getUsers(filter: Filter): Observable<User[]> {
    let params = new HttpParams();

    Object.keys(filter)
      .forEach(key => params = params.append(key, '' + filter[key as keyof Filter]));

    return this.http.get<Users>(`${this.api}/search/users`, { params })
      .pipe(map(res => res.items));
  }

  getUser(username: string, withOrgs = false): Observable<UserWithRepo> {
    return this.http.get<UserFull>(`${this.api}/users/${username}`)
      .pipe(
        switchMap(user => combineLatest([
              this.http.get<Repository[]>(user.repos_url),
              withOrgs ? this.http.get<Organization[]>(user.organizations_url) : of([])
            ])
            .pipe(
              map(([repos, orgs]) => ({ repos: repos.slice(0, 3), orgs: orgs.slice(0, 3), ...user }))
            )
          ),
      );
  }

}


