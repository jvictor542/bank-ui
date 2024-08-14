import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AgenciaService} from "@app/shared";
import {AgenciasComponent} from "@app/pages/agencias/agencias.component";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    AgenciasComponent,
    RouterLinkActive,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatToolbar
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent{

  title: string = 'Bank';

  options = [
    { value: 'agencias', viewValue: 'Agências' },
    { value: 'clientes', viewValue: 'Clientes' }
  ];

  selectedValue = 'agencias';

  constructor() {
  }

}
