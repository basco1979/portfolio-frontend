import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  
    id:any
  fomrEntry : FormData
  constructor(private http: HttpClient) { }

  urlEducacion = 'https://grisly-demon-46892.herokuapp.com/educacion/get'

  obtenerDatosEducacion(): Observable<any> {
    return this.http.get(this.urlEducacion)
  }

  crearEducacion(res : any){
   return this.http.post('https://grisly-demon-46892.herokuapp.com/educacion/crear/', res, {responseType:'text'})
  .subscribe(data => 
    {console.log(data)})
  }

  modificarDatosEducacion(id : any, body : any) {
    return this.http.put('https://grisly-demon-46892.herokuapp.com/educacion/editar/' + id + '?img=https://upload.wikimedia.org/wikipedia/commons/3/38/The_Woodlands_College_Park_Front_Image.jpg&titulo='+body.titulo+'&institucion='+body.institucion+'&fecha_inicio='+body.fecha_inicio+'&fecha_fin='+body.fecha_fin, {}).subscribe(data => console.log("Modificado!!"))
   }

  eliminarDatosEducacion(id: any){
    return this.http.delete('https://grisly-demon-46892.herokuapp.com/educacion/borrar/' + id, {responseType:'text'}).subscribe((resp:any) => {
      console.log(resp.data.id)
  })
  }
}