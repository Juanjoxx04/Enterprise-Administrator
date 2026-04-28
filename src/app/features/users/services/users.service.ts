import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private http = inject(HttpClient);
  private url = "https://69dd9959410caa3d47b9a9a4.mockapi.io/api/v1/users"

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  search(query: string): Observable<User[]> {
    return this.http.get<User[]>(this.url, {
      params: { search: query }
    });
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  update(id: string, user: User):Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, user);
  }

  delete(id: string): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }

}