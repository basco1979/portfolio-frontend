import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css']
})
export class RedesComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  logueado() : boolean{
    return this.authService.logIn
  }

  logout() : void{
  this.authService.logout()
  }

}
