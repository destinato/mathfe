import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<any> {
    return this.http.get(`${environment.apiURL}/users`)
    .map((response) => response)
    .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));;
  }
  getUser(id: String): Observable<any> {
    return this.http.get(`${environment.apiURL}/users/` + id)
      .map((response) => response['user'])
        .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));
  }
  updateUser(user: Object): Observable<User[]> {
    const apiUrl = `${environment.apiURL}/users`
    const url = `${apiUrl}/${user['id']}`;
    return this.http.put<User[]>(url, user)
      .map((response) => response)
      .catch((error: any) => Observable.throw(error.error || {message: 'Server Error'}));
  }
  deleteUser(id: String): Observable<User[]> {
    const apiUrl = `${environment.apiURL}/users`
    const url = `${apiUrl}/${id}`;
    return this.http.delete<User[]>(url)
      .map((response) => response)
      .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'}));
  }
}