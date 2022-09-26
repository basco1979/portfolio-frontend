import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AcercadeComponent } from '../components/acercade/acercade.component';
import { ExperienciaComponent } from '../components/experiencia/experiencia.component';
import { EducacionComponent } from '../components/educacion/educacion.component';
import { SkillsComponent } from '../components/skills/skills.component';
import { ProyectosComponent } from '../components/proyectos/proyectos.component';
import { LoginComponent } from '../components/login/login.component';
import { PanelComponent } from '../components/panel/panel.component';

const routes: Routes = [
  {path: '', redirectTo: 'acercade', pathMatch: 'full'},
  {path: "acercade", component: AcercadeComponent},
  {path: "experiencia", component: ExperienciaComponent},
  {path: "educacion", component: EducacionComponent},
  {path: "skills", component: SkillsComponent},
  {path: "proyectos", component: ProyectosComponent},
  {path: "login", component: LoginComponent},
  {path: "panel", component: PanelComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {enableTracing: true}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModuleTsModule { }
