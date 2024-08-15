import {Component, OnInit} from '@angular/core';
import {MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {ActivatedRoute} from "@angular/router";
import {ClienteService, ContacorrenteService, ExtratoService, ICliente, IContaCorrente, IExtrato} from "@app/shared";
import {CurrencyPipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ContaCorrenteFormComponent} from "@app/pages/conta-corrente/conta-corrente-form/conta-corrente-form.component";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {AgenciaFormComponent} from "@app/pages/agencias/agencia-form/agencia-form.component";
import {ExtratosComponent} from "@app/pages/extratos/extratos.component";
import {Operacao} from "@shared/enums";

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
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatFormField,
    FormsModule,
    MatInput,
    MatPrefix,
    MatSuffix,
    MatLabel,
    MatSelect,
    MatOption,
    MatHint,
    AgenciaFormComponent,
    ExtratosComponent
  ],
  templateUrl: './cliente-detail.component.html',
  styleUrl: './cliente-detail.component.scss'
})
export class ClienteDetailComponent implements OnInit{

  cliente: ICliente;
  conta: IContaCorrente;
  temConta: boolean = false;
  showModal: boolean = false;
  showSaqueCampo: boolean = false;
  showDepositoCampo: boolean = false;
  showTransferenciaCampo: boolean = false;

  valorSaque: number | null = null;
  valorDeposito: number | null = null
  valorTransferencia: number | null = null;
  idDestino: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private contaService: ContacorrenteService,
    private extratoService: ExtratoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadClienteInfos();
  }

  loadClienteInfos() {
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
    const dialogRef = this.dialog.open(ContaCorrenteFormComponent, {
      width: '400px',
      data: { clientId: this.cliente.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClienteInfos();
      }
    });
  }

  deletarConta(): void {
    this.contaService.deleteContas(this.conta.id).subscribe(() => this.loadClienteInfos());
  }

  sacar(event: any): void {
    if (event === "Enter") {

      const extrato: IExtrato = {
        dataHoraMovimento: new Date(),
        valor: this.valorSaque,
        operacao: Operacao.SAQUE,
        contaCorrenteId: this.conta.id,
        contaDestinoId: 0
      }

      this.contaService.sacar(this.conta.id, this.valorSaque).subscribe(
        () => {
          this.loadClienteInfos();
          this.showSaqueCampo = false;
          this.criaExtrato(extrato);
        });
    }
  }

  depositar(event:any):void {
    if (event === "Enter") {

      this.contaService.depositar(this.conta.id, this.valorDeposito).subscribe(
        () => {
          this.loadClienteInfos();
          this.showDepositoCampo = false;
        });
    }
  }

  transferir(event:any):void {
    if (event === "Enter") {

      this.contaService.transferir(this.conta.id, this.idDestino, this.valorTransferencia)
        .subscribe(() => {
          this.loadClienteInfos();
          this.showTransferenciaCampo = false;
        })
    }
  }

  criaExtrato(extrato: IExtrato) {
    this.extratoService.addExtrato(extrato).subscribe(() => this.loadClienteInfos());
  }

  exibirExtratos() {
    this.showModal = true;
  }

  fecharExtratos() {
    this.showModal = false;
  }


}
