import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {AgenciaService, ClienteService, IAgencia, ICliente} from "@app/shared";

@Component({
  selector: 'app-cliente-form',
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
        MatLabel
    ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})
export class ClienteFormComponent implements OnInit{

  isEditMode = false;
  @Input() clienteToEdit: ICliente | null = null;

  @Output() clienteCreated = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    if (this.clienteToEdit) { this.isEditMode = true }
    this.populateForm()
  }

  populateForm(): void {
    if (this.clienteToEdit) {
      this.newClienteForm.patchValue({
        nome: this.clienteToEdit.nome,
        telefone: this.clienteToEdit.telefone,
        cpf: this.clienteToEdit.cpf,
        id: this.clienteToEdit.id.toString()
      });
    }
  }

  saveCliente() {

    if (this.newClienteForm.valid) {
      const formData = this.newClienteForm.value;

      if (this.isEditMode) {
        this.clienteService.updateClientes(this.clienteToEdit?.id, formData).subscribe({
          next: () => {
            this.reset();
            this.clienteCreated.emit();
            this.close();
          },
          error: (error: any) => {
            console.error('Erro ao criar cliente', error);
          }
        });
      } else {
        this.clienteService.addCliente(formData).subscribe({
          next: () => {
            this.reset();
            this.clienteCreated.emit();
            this.close();
          },
          error: (error: any) => {
            console.error('Erro ao criar cliente:', error);
          }
        });
      }
    }
  }

  reset(): void {
    this.newClienteForm.reset();
    this.isEditMode = false;
    this.clienteToEdit = null;
  }

  close() {
    this.reset();
    this.closeModal.emit();
  };

  newClienteForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
    telefone: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^\d{2} \d \d{4}-\d{4}$/)]),
    cpf: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required])
  });
}
