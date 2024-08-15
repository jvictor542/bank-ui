import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {ExtratoService, IExtrato} from "@app/shared";
import {ExtratoDetailComponent} from "@app/pages/extratos/extrato-detail/extrato-detail.component";
import {CommonModule, NgFor} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-extratos',
  standalone: true,
  imports: [
    MatCard,
    ExtratoDetailComponent,
    CommonModule,
    NgFor,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './extratos.component.html',
  styleUrl: './extratos.component.scss'
})
export class ExtratosComponent implements OnInit{

  extratos: IExtrato[];

  @Output() closeModal = new EventEmitter<void>();
  @Input() contaId: number;

  constructor(
    private extratosService: ExtratoService
  ) {
  }

  ngOnInit() {
    this.extratosService.getExtratosByContaCorrenteId(this.contaId).subscribe({
      next: (extratos: IExtrato[]) => {
        this.extratos = extratos;
      },
      error: (err) => {
        console.error('Error fetching extratos:', err);
      }
    })
  }

  close() {
    this.closeModal.emit();
  }


}
