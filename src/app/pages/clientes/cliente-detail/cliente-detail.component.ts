import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {ActivatedRoute} from "@angular/router";
import {AgenciaService, ClienteService, ContacorrenteService, IAgencia, ICliente, IContaCorrente} from "@app/shared";
import {CurrencyPipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ContaCorrenteFormComponent} from "@app/pages/conta-corrente/conta-corrente-form/conta-corrente-form.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-cliente-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    NgIf,
    MatButton,
    CurrencyPipe,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './cliente-detail.component.html',
  styleUrl: './cliente-detail.component.scss'
})
export class ClienteDetailComponent implements OnInit{

  cliente: ICliente;
  conta: IContaCorrente;
  agencia: IAgencia;
  temConta: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private contaService: ContacorrenteService,
    private agenciaService: AgenciaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.clienteService.getClienteById(id).subscribe(data => {
        this.cliente = data;
      });
      this.contaService.getContas().subscribe(result => {
        this.conta = result.find(conta => conta.clienteId === this.cliente.id);
        this.temConta = !!this.conta;
      })
      }
  }

  addConta(): void {
    // Open the dialog
    this.dialog.open(ContaCorrenteFormComponent, {
      width: '400px',
      data: { clientId: this.cliente.id }
    });
  }

  deletarConta(): void {
    this.contaService.deleteContas(this.conta.id);
  }
}
