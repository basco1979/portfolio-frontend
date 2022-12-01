import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  
    id:any
  fomrEntry : FormData
  constructor(private http: HttpClient) { }

  urlPerfil = 'https://grisly-demon-46892.herokuapp.com/perfil/get'

  obtenerDatosPerfil(): Observable<any> {
    return this.http.get(this.urlPerfil)
  }

  modificarFotoPerfil(id : any, body : any) {
    return this.http.put('https://grisly-demon-46892.herokuapp.com/perfil/editarFotoPerfil/' + id + '?imgPerfil=', {}).subscribe(data => console.log("Modificado!!"))
   }

   modificarBanner(id : any, body : any) {
    return this.http.put('https://grisly-demon-46892.herokuapp.com/perfil/editarBanner/' + id + '?imgBanner=', {}).subscribe(data => console.log("Modificado!!"))
   }

   modificarTexto(id : any, body : any) {
    return this.http.put('https://grisly-demon-46892.herokuapp.com/perfil/editarTexto/' + id + '?nombre=' + body.nombre + '&descripcion=' + body.descripcion, {}).subscribe(data => console.log("Modificado!!"))
   }
}