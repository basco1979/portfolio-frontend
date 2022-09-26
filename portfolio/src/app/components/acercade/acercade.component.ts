import { Component, OnInit } from '@angular/core';
import { PortfoliotService } from '../../services/portfoliot.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  acercaDe : any = []
  
  constructor(private adservice : PortfoliotService) { }

  ngOnInit(): void {
  this.getDatos()
  }

  getDatos(): void{
    this.adservice.obtenerDatos().subscribe(data => this.acercaDe = data.acercade)
  }

}
