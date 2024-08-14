import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {AgenciaService, ContacorrenteService, IAgencia} from "@app/shared";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

@Component({
  selector: 'app-conta-corrente-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    NgIf,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    NgForOf,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatLabel
  ],
  templateUrl: './conta-corrente-form.component.html',
  styleUrl: './conta-corrente-form.component.scss'
})
export class ContaCorrenteFormComponent implements OnInit{

  agencias: IAgencia[];

  constructor(
    public dialogRef: MatDialogRef<ContaCorrenteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clientId: number },
    private agenciaService: AgenciaService,
    private contaService: ContacorrenteService
  ) {
  }

  ngOnInit() {
    this.agenciaService.getAgencias().subscribe(
      {
        next: (agencias) => {
          this.agencias = agencias;
        },
        error: (err) => {
          alert("Error ao carregar agências.");
          console.log(err)
        }
      }
    )
  }

  close(): void {
    this.dialogRef.close();
  }

  addConta() {
    alert('chamou')
    console.log(this.newContaForm)
    if (this.newContaForm.valid) {
      const formData = this.newContaForm.value;

        this.contaService.addConta(formData).subscribe({
          next: () => {
            this.close();
          },
          error: (error: any) => {
            console.error('Erro ao criar agência:', error);
          }
        });
      }
  }

  newContaForm = new FormGroup({
    numero: new FormControl('', [Validators.required]),
    saldo: new FormControl('', [Validators.required, Validators.minLength(1)]),
    agenciaId: new FormControl('', [Validators.required]),
    clienteId: new FormControl(this.data.clientId, [Validators.required])
  });
}
