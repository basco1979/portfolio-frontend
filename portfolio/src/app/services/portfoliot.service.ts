import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfoliotService {

  constructor( private http : HttpClient) { }

  url = 'assets/data/db.json'
  obtenerDatos():Observable<any>{
    return this.http.get(this.url)
  }
}
