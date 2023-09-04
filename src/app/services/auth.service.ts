import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url: string = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  public register(user:any) {

    return this.http.post<any>(this.url + 'api/user/register', user);
  }

  public login(user:any) {

    return this.http.post<any>(this.url + 'api/user/login', user);
  }
}
