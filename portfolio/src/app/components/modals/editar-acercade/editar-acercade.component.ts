import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-acercade',
  templateUrl: './editar-acercade.component.html',
  styleUrls: ['./editar-acercade.component.css']
})
export class EditarAcercadeComponent implements OnInit {
  acercade : string = 'lorem ipsum dolor sit amet, consectetur adipiscing elit';
  constructor() { }

  ngOnInit(): void {
  }

}
