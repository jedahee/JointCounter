import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Orange } from '../models/orange';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url: string = environment.API_URL; // BACKEND URL

  constructor(private http: HttpClient) { }

  // Request for get joints/cigars with a limit (limit of registers to return) and skip (skip registers before to do the request)
  getLimitSkipOranges(idUser: string, limit: number, skip: number) {
    return this.http.get<any>(this.url + 'api/admin/orange/' + idUser + "/" + limit + "/" + skip);
  }

  // Add joint or cigar requet
  addOrange(orange:Orange) {
    return this.http.post<any>(this.url + 'api/admin/orange', orange);
  }

  // Delete joint or cigar requet
  delOrange(id: string) {
    return this.http.delete<any>(this.url + 'api/admin/orange/' + id);
  }

  // Get all joints/cigars of user by id
  getOrangesByUser(idUser: string) {

    return this.http.get<any>(this.url + 'api/admin/orange/' + idUser);
  }

  // Get all joints/cigars of a date(month/year) and by user id
  getOrangesByUserYearMonth(idUser: string, year:string, month:string) {

    return this.http.get<any>(this.url + 'api/admin/orange/filter/' + idUser + '/'+year+'/' +month);
  }

  // Delete user
  delUser(idUser:string) {
    return this.http.delete<any>(this.url + 'api/admin/user/delete/' + idUser);
  }

  // Update name of user
  updateName(idUser:string, name:string) {
    let data = {
      name: name
    }

    return this.http.put<any>(this.url + 'api/admin/user/update/' + idUser, data)
  }

  // Get name of user
  getName(idUser:string) {
    
    return this.http.get<any>(this.url + 'api/admin/user/name/' + idUser)
  }
}
