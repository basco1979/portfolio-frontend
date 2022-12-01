import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  
    id:any
  fomrEntry : FormData
  constructor(private http: HttpClient) { }

  urlExperiencia = 'https://grisly-demon-46892.herokuapp.com/experiencia/get'

  obtenerDatosExperiencia(): Observable<any> {
    return this.http.get(this.urlExperiencia)
  }

  crearExperiencia(res : any){
   return this.http.post('https://grisly-demon-46892.herokuapp.com/experiencia/crear/', res, {responseType:'text'})
  .subscribe(data => 
    {console.log(data)})
  }

  modificarDatosExperiencia(id : any, body : any) {
    return this.http.put('https://grisly-demon-46892.herokuapp.com/experiencia/editar/' + id + '?img=https://dnb2eg0emsxdz.cloudfront.net/blog/wp-content/uploads/2017/11/lenguajesdeprogramacion_principal.jpg&titulo='+body.titulo+'&institucion='+body.institucion+'&fecha_inicio='+body.fecha_inicio+'&fecha_fin='+body.fecha_fin, {}).subscribe(data => console.log("Modificado!!"))
   }

  eliminarDatosExperiencia(id: any){
    return this.http.delete('https://grisly-demon-46892.herokuapp.com/experiencia/borrar/' + id, {responseType:'text'}).subscribe((resp:any) => {
      console.log(resp.data.id)
  })
  }
}