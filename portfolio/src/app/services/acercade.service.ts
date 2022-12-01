import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcercadeService {

  constructor(private http: HttpClient) { }

  urlAcercaDe = 'https://grisly-demon-46892.herokuapp.com/acercade/get'


  obtenerDatosAcercaDe(): Observable<any> {
    return this.http.get(this.urlAcercaDe)
  }
  modificarDatosAcercaDe(id : any, body : any) {
    return this.http.put('https://grisly-demon-46892.herokuapp.com/acercade/editar/' + id +'?descripcion='+body.descripcion, {}).subscribe(data => console.log("Modificado!!"))
   }
}
