import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {IExtrato} from "@app/shared";

@Component({
  selector: 'app-extrato-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle
  ],
  templateUrl: './extrato-detail.component.html',
  styleUrl: './extrato-detail.component.scss'
})
export class ExtratoDetailComponent {

  @Input() extrato: IExtrato;
}
