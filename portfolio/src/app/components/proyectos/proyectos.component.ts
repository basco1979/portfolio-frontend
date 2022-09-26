import { Component, OnInit } from '@angular/core';
import { PortfoliotService } from 'src/app/services/portfoliot.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos : any = []
  
  constructor(private proyectoservice : PortfoliotService) { }

  ngOnInit(): void {
  this.getDatos()
  }

  getDatos(): void{
    this.proyectoservice.obtenerDatos().subscribe(data => this.proyectos = data.proyectos)
  }
}
