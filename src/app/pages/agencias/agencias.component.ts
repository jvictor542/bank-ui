import { Component } from '@angular/core';
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-agencias',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './agencias.component.html',
  styleUrl: './agencias.component.scss'
})
export class AgenciasComponent {

}
