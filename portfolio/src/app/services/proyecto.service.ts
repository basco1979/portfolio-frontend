import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  
  id:any
  fomrEntry : FormData
  constructor(private http: HttpClient) { }

  urlProyecto = 'https://grisly-demon-46892.herokuapp.com/proyecto/get'

  obtenerDatosProyecto(): Observable<any> {
    return this.http.get(this.urlProyecto)
  }

  crearProyecto(res : any){
   return this.http.post('https://grisly-demon-46892.herokuapp.com/proyecto/crear/', res, {responseType:'text'})
  .subscribe(data => 
    {console.log(data)})
  }

  modificarDatosProyecto(id : any, body : any) {
    return this.http.put('https://grisly-demon-46892.herokuapp.com/proyecto/editar/' 
    + id + '?titulo='+body.titulo+'&link='+body.link+'&descripcion='+body.descripcion, {})
    .subscribe(data => console.log("Modificado!!"))
   }

  eliminarDatosProyecto(id: any){
    return this.http.delete('https://grisly-demon-46892.herokuapp.com/proyecto/borrar/' + id, {responseType:'text'}).subscribe((resp:any) => {
      console.log("Eliminado!")
  })
  }
}