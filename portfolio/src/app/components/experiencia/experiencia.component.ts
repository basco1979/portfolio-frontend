import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import {
  DialogLayoutDisplay,
  ConfirmBoxInitializer
} from '@costlydeveloper/ngx-awesome-popup';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experiencias : any = []
  
  editProfileForm = this.fb.group({
    id:[''],
    descripcion: [''],
    titulo: [''],
    fecha_inicio: [''],
    fecha_fin: ['']
   });

   createProfileForm = this.fb.group({
    descripcion: [''],
    titulo: [''],
    fecha_inicio: [''],
    fecha_fin: [''],
    img:['https://dnb2eg0emsxdz.cloudfront.net/blog/wp-content/uploads/2017/11/lenguajesdeprogramacion_principal.jpg'],


  });

  constructor(
    private experienciaservice : ExperienciaService,
    private fb: FormBuilder, 
    private authService : AuthService, 
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getDatos()
  }
  
    getDatos(): void{
      this.experienciaservice.obtenerDatosExperiencia()
      
      /*.subscribe(data => {
        this.experiencias = data;
        },
      error => {
        console.log(error);
      });*/


      .subscribe({
        next: (data) => {
          this.experiencias = data;
          },
        error: error => console.log(error)
     });
}


reload() {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['./'], { relativeTo: this.route });
}
logueado() : boolean{
  return this.authService.logIn
}

openModalCreate(targetModal) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static'
  });
}
openModal(targetModal, user) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static'
  });
 
  this.editProfileForm.patchValue({
   id:user.id,
   descripcion: user.descripcion,
   titulo: user.titulo,
   fecha_inicio: user.fecha_inicio,
   fecha_fin: user.fecha_fin
  });
 }


 async onSubmitEdit() {
  this.modalService.dismissAll();
  var res = this.editProfileForm.getRawValue();
   this.experienciaservice.modificarDatosExperiencia(res.id, res)
   this.getDatos()

  await this.reload();
}
async onSubmit() {
this.modalService.dismissAll();
var res = this.createProfileForm.getRawValue();

this.experienciaservice.crearExperiencia(res)
this.getDatos()

this.reload()
} 

eliminar(id:number) {
const confirmBox = new ConfirmBoxInitializer();
confirmBox.setTitle('Está seguro?');
confirmBox.setMessage('Confirma que desea eliminar este item? ');
confirmBox.setButtonLabels('SI', 'NO');

// Choose layout color type
confirmBox.setConfig({
  layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
});

// Simply open the popup and listen which button is clicked
confirmBox.openConfirmBox$().subscribe(resp => {
  // IConfirmBoxPublicResponse
  if(resp.clickedButtonID == "si") {
    this.experienciaservice.eliminarDatosExperiencia(id); 
    this.getDatos()
    
}
this.reload();}
);
}
}