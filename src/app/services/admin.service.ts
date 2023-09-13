import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Orange } from '../models/orange';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  getLimitSkipOranges(idUser: string, limit: number, skip: number) {
    return this.http.get<any>(this.url + 'api/admin/orange/' + idUser + "/" + limit + "/" + skip);
  }

  addOrange(orange:Orange) {
    return this.http.post<any>(this.url + 'api/admin/orange', orange);
  }

  delOrange(id: string) {
    return this.http.delete<any>(this.url + 'api/admin/orange/' + id);
  }

  getOrangesByUser(idUser: string) {

    return this.http.get<any>(this.url + 'api/admin/orange/' + idUser);
  }
}
