import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import {
  DialogLayoutDisplay,
  ConfirmBoxInitializer
} from '@costlydeveloper/ngx-awesome-popup';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos : any = []
  
  editProfileForm = this.fb.group({
    id:[''],
    descripcion: [''],
    titulo: [''],
    link: [''],
   });

   createProfileForm = this.fb.group({
    descripcion: [''],
    titulo: [''],
    link: [''],


  });

  constructor(
    private proyectoservice : ProyectoService,
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
    this.proyectoservice.obtenerDatosProyecto().subscribe(data => {this.proyectos = data})
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
    link: user.link
  });
 }


 async onSubmitEdit() {
  this.modalService.dismissAll();
  var res = this.editProfileForm.getRawValue();
   this.proyectoservice.modificarDatosProyecto(res.id, res)
  await this.reload();
}
async onSubmit() {
this.modalService.dismissAll();
var res = this.createProfileForm.getRawValue();

this.proyectoservice.crearProyecto(res)
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
    this.proyectoservice.eliminarDatosProyecto(id); 
    
}
this.reload();}
);
}
}