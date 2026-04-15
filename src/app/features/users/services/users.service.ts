import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private url = "https://69dd9959410caa3d47b9a9a4.mockapi.io/api/v1/users"
  constructor(private http: HttpClient) { }

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}