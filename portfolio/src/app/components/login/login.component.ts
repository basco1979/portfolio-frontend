import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //form : FormGroup;
  nombreUsuario : string;
  password : string;

constructor(public authService : AuthService, public router: Router){}

  /* constructor(private formBuilder : FormBuilder, private authService : AuthService) { 
    this.form = this.formBuilder.group({
      password : ['', [Validators.required]],
      nombreUsuario : ['', [Validators.required]]
    })
  }
 */
  ngOnInit(): void {
  }

 /*  get Password(){
    return this.form.get("password");
  }
 
  get NombreUsuario(){
   return this.form.get("nombreUsuario");
  }

  get PasswordValid(){
    return this.Password?.touched && !this.Password?.valid;
  }

  get NombreUsuarioValid() {
    return false
  }
 
  login(){
    console.log(this.nombreUsuario, this.password)
    this.authService.login(this.nombreUsuario, this.password)
  }

  onEnviar(event : Event){
    event.preventDefault();
    if(this.form.valid){
    this.login()
    }
    else{
      this.form.markAllAsTouched();
    }
  }
*/
  login() {
    const user = {nombreUsuario: this.nombreUsuario, password: this.password};
    this.authService.login(user).subscribe( data => {
    this.authService.setToken(data.token);
    this.router.navigateByUrl("/")
    });
  }

}
