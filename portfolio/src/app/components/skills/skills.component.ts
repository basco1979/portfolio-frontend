import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import {
  DialogLayoutDisplay,
  ConfirmBoxInitializer
} from '@costlydeveloper/ngx-awesome-popup';
import { HabilidadService } from 'src/app/services/habilidad.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills : any = []
  editProfileForm = this.fb.group({
    id:[''],
    cantidad: [''],
    titulo: [''],
    color: [''],
   });

   createProfileForm = this.fb.group({
    cantidad: [''],
    titulo: [''],
    color: [''],


  });


  constructor(
    private skillservice : HabilidadService,
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
    this.skillservice.obtenerDatosHabilidad().subscribe(data => {this.skills = data})
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
     cantidad: user.cantidad,
     titulo: user.titulo,
      color: user.color
    });
   }
  
  
   async onSubmitEdit() {
    this.modalService.dismissAll();
    var res = this.editProfileForm.getRawValue();
    console.log(res.color)
     this.skillservice.modificarDatosHabilidad(res.id, res)
    this.getDatos()

    await this.reload();
  }
  async onSubmit() {
  this.modalService.dismissAll();
  var res = this.createProfileForm.getRawValue();
  
  this.skillservice.crearHabilidad(res)
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
      this.skillservice.eliminarDatosHabilidad(id); 
    this.getDatos()
      
  }
  this.reload();}
  );
  }
  }
