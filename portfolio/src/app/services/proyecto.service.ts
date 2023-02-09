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

  urlProyecto = 'https://portfolio-backend-kkty.onrender.com/proyecto/get'

  obtenerDatosProyecto(): Observable<any> {
    return this.http.get(this.urlProyecto)
  }

  crearProyecto(res : any){
   return this.http.post('https://portfolio-backend-kkty.onrender.com/proyecto/crear/', res, {responseType:'text'})
  .subscribe(data => 
    {console.log(data)})
  }

  modificarDatosProyecto(id : any, body : any) {
    return this.http.put('https://portfolio-backend-kkty.onrender.com/proyecto/editar/' 
    + id + '?titulo='+body.titulo+'&link='+body.link+'&descripcion='+body.descripcion, {})
    .subscribe(data => console.log("Modificado!!"))
   }

  eliminarDatosProyecto(id: any){
    return this.http.delete('https://portfolio-backend-kkty.onrender.com/proyecto/borrar/' + id, {responseType:'text'}).subscribe((resp:any) => {
      console.log("Eliminado!")
  })
  }
}