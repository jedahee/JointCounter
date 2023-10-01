import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url: string = environment.API_URL; // URL BACKEND

  constructor(private http: HttpClient) { }
  
  // Request for create account user
  public register(user:any) {

    return this.http.post<any>(this.url + 'api/user/register', user);
  }

  // Request for login user
  public login(user:any) {

    return this.http.post<any>(this.url + 'api/user/login', user);
  }

  // Request for validate user
  public me(token: string) {
    return this.http.post<any>(this.url + 'api/user/me', {token: token});
  }

  // Request for update currency and prices
  public updateCurrency(idUser: string, currency: string, cigar_cost:string, paper_cost:string,joint_cost:string) {
    let data = {
      currency: currency,
      cigar_cost:cigar_cost,
      paper_cost:paper_cost,
      joint_cost:joint_cost
    }
    return this.http.put<any>(this.url + 'api/admin/currency/'+idUser, data);
  }
}
