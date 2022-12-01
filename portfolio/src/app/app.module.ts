import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModuleTsModule } from './app-routing.module.ts/app-routing.module.ts.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { PanelComponent } from './components/panel/panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { RedesComponent } from './components/redes/redes.component';
import { EditarAcercadeComponent } from './components/modals/editar-acercade/editar-acercade.component';
import { EditarExperienciaComponent } from './components/modals/editar-experiencia/editar-experiencia.component';
import { EditarEducacionComponent } from './components/modals/editar-educacion/editar-educacion.component';
import { EditarSkillsComponent } from './components/modals/editar-skills/editar-skills.component';
import { EditarProyectosComponent } from './components/modals/editar-proyectos/editar-proyectos.component';
import { BotonlogoutComponent } from './components/botonlogout/botonlogout.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  NgxAwesomePopupModule,
  ConfirmBoxConfigModule
} from '@costlydeveloper/ngx-awesome-popup';


@NgModule({
  declarations: [	
    AppComponent,
    HeaderComponent,
    ExperienciaComponent,
    AcercadeComponent,
    EducacionComponent,
    SkillsComponent,
    ProyectosComponent,
    NavbarComponent,
    MenuComponent,
    LoginComponent,
    PanelComponent,
    FooterComponent,
    RedesComponent,
    EditarAcercadeComponent,
    EditarExperienciaComponent,
    EditarEducacionComponent,
    EditarSkillsComponent,
    EditarProyectosComponent,
    BotonlogoutComponent,
   ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModuleTsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    ConfirmBoxConfigModule.forRoot() // Essential, mandatory confirm box module.
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {constructor(library: FaIconLibrary) {
  library.addIconPacks(fas, far);
} }
