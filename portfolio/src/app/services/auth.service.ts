import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http'
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient, private cookies: CookieService, private router : Router,  private route: ActivatedRoute,) {}

  login(user: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8')
    return this.http.post("https://portfolio-backend-kkty.onrender.com/auth/login", user);
    
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  public get logIn():boolean{
    var tk = this.getToken();
    return tk != ""
  }

  logout(){
    this.cookies.delete(this.getToken());
    this.cookies.deleteAll();
    this.reload();
}
}