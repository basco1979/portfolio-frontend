import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  
  id:any
  fomrEntry : FormData
  constructor(private http: HttpClient) { }

  urlHabilidad = 'https://portfolio-backend-kkty.onrender.com/habilidad/get'

  obtenerDatosHabilidad(): Observable<any> {
    return this.http.get(this.urlHabilidad)
  }

  crearHabilidad(res : any){
   return this.http.post('https://portfolio-backend-kkty.onrender.com/habilidad/crear/', res, {responseType:'text'})
  .subscribe(data => 
    {console.log(data)})
  }

  modificarDatosHabilidad(id : any, body : any) {
    return this.http.put('https://portfolio-backend-kkty.onrender.com/habilidad/editar/' 
    + id + '?cantidad='+body.cantidad+'&color='+body.color+'&titulo='+body.titulo, {})
    .subscribe(data => console.log("Modificado!!"))
   }

  eliminarDatosHabilidad(id: any){
    return this.http.delete('https://portfolio-backend-kkty.onrender.com/habilidad/borrar/' + id, {responseType:'text'}).subscribe((resp:any) => {
      console.log("Eliminado!")
  })
  }
}