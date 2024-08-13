import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AgenciaService} from "@app/shared";
import {AgenciasComponent} from "@app/pages/agencias/agencias.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    AgenciasComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{

  title: string = 'Bank';

  constructor(private agenciaService: AgenciaService) {
  }

  ngOnInit() {
    this.agenciaService.getAgencias().subscribe(
      {
        next: (agencias) => console.log(agencias)
      }
    )
  }
}
