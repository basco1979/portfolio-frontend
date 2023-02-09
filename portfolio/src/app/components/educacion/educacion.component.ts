import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { EducacionService } from 'src/app/services/educacion.service';
import {
  DialogLayoutDisplay,
  ConfirmBoxInitializer
} from '@costlydeveloper/ngx-awesome-popup';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  estudios : any = []

  
  editProfileForm = this.fb.group({
    id:[''],
    institucion: [''],
    titulo: [''],
    fecha_inicio: [''],
    fecha_fin: ['']
   });

   createProfileForm = this.fb.group({
    institucion: [''],
    titulo: [''],
    fecha_inicio: [''],
    fecha_fin: [''],
    img:['https://upload.wikimedia.org/wikipedia/commons/3/38/The_Woodlands_College_Park_Front_Image.jpg'],


  });



  constructor(
    private fb: FormBuilder, 
    private educacionservice : EducacionService, 
    private authService : AuthService, 
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
  this.getDatos()  
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  getDatos(): void{
    this.educacionservice.obtenerDatosEducacion()
    
    /*.subscribe(data => {
      this.experiencias = data;
      },
    error => {
      console.log(error);
    });*/


    .subscribe({
      next: (data) => {
        this.estudios = data;
        },
      error: error => console.log(error)
   });
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
     institucion: user.institucion,
     titulo: user.titulo,
     fecha_inicio: user.fecha_inicio,
     fecha_fin: user.fecha_fin
    });
   }


   async onSubmitEdit() {
    this.modalService.dismissAll();
    var res = this.editProfileForm.getRawValue();
     this.educacionservice.modificarDatosEducacion(res.id, res)
  this.getDatos()

    await this.reload();
}
 async onSubmit() {
  this.modalService.dismissAll();
  var res = this.createProfileForm.getRawValue();
  
  this.educacionservice.crearEducacion(res)
  this.getDatos()
  await this.reload()
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
      this.educacionservice.eliminarDatosEducacion(id); 
      this.getDatos()
      
  }
  this.reload();}
);
  
}


}
