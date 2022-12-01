import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AcercadeService } from '../../services/acercade.service';
import {
  DialogLayoutDisplay,
  ConfirmBoxInitializer
} from '@costlydeveloper/ngx-awesome-popup';


@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  acercaDe : any = []
  editProfileForm = this.fb.group({
    id:[''],
    descripcion: [''],
   });
  constructor(
    private acercadeservice : AcercadeService, 
    private authService : AuthService,  
    private fb: FormBuilder, 
    private modalService: NgbModal,    
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  this.getDatos()
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  getDatos(): void{
    this.acercadeservice.obtenerDatosAcercaDe().subscribe(data => {
      this.acercaDe = data[0];
    },
    error => {
      console.log(error);
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
    
    });
   }

  async onSubmitEdit() {
    this.modalService.dismissAll();
    var res = this.editProfileForm.getRawValue();
     this.acercadeservice.modificarDatosAcercaDe(res.id, res)
    await this.reload();
}

  logueado() : boolean{
    return this.authService.logIn
  }
}
