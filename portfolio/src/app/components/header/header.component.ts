import { HttpClient,HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  datos : any;
  
    
    constructor(
      private datosservice : PerfilService, 
      private authService : AuthService,
      private httpClient : HttpClient,
      private modalService: NgbModal,
      private fb: FormBuilder,    
      private route: ActivatedRoute,
      private router: Router,
   ) { }

  ngOnInit(): void {
  this.getDatos()
}
  uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;


  cambiarFotoPerfil = this.fb.group({
    id:[''],
    imgPerfil: [''],
   });

   cambiarTexto = this.fb.group({
    id:[''],
    nombre: [''],
    descripcion: [''],
   });

   reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  logueado() : boolean{
    return this.authService.logIn
  }

  openModal(targetModal, user) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   
    this.cambiarFotoPerfil.patchValue({
     id: user.id,
      imgPerfil : user.imgPerfil
    });
   }

   openModalText(targetModal, user) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   
    this.cambiarTexto.patchValue({
     id: user.id,
      nombre : user.nombre,
      descripcion: user.descripcion
    });
   }

   async onSubmit() {
    this.modalService.dismissAll();
    var res = this.cambiarTexto.getRawValue();
    
    this.datosservice.modificarTexto(res.id, res)
    this.reload()
    } 

    public onImageUpload(event) {    
      this.uploadedImage = event.target.files[0];
    }


  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    
    this.httpClient.post('https://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5/', imageFormData,
    {headers: 
    {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'POST' } }
     )
          .subscribe((res) => {
        console.log(res)
      }
      );        
    }


  getDatos(): void{
    this.datosservice.obtenerDatosPerfil().subscribe(data => {
      this.datos = data[0];
    },
    error => {
      console.log(error);
    });
  }
   
  modificarFotoPerfil(id: any, body: any) : void{
    this.datosservice.modificarFotoPerfil(id, body)

  }

}
