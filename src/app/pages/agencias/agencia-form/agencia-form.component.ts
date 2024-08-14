import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {AgenciaService, IAgencia} from "@app/shared";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-agencia-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatCardTitle,
    ReactiveFormsModule,
    MatCardActions,
    MatButton,
    MatInput,
    CommonModule
  ],
  templateUrl: './agencia-form.component.html',
  styleUrl: './agencia-form.component.scss'
})
export class AgenciaFormComponent implements OnInit{

  isEditMode = false;
  @Input() agenciaToEdit: IAgencia | null = null;

  @Output() agenciaCreated = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private agenciaService: AgenciaService) {
  }

  ngOnInit(): void {
    if (this.agenciaToEdit) { this.isEditMode = true };
    this.populateForm()
  }

  populateForm(): void {
    if (this.agenciaToEdit) {
      this.newAgenciaForm.patchValue({
        nome: this.agenciaToEdit.nome,
        telefone: this.agenciaToEdit.telefone,
        endereco: this.agenciaToEdit.endereco,
        id: this.agenciaToEdit.id.toString()
      });
    }
  }

  saveAgencia() {

    if (this.newAgenciaForm.valid) {
      const formData = this.newAgenciaForm.value;

      if (this.isEditMode) {
        this.agenciaService.updateAgencia(this.agenciaToEdit?.id, formData).subscribe({
          next: () => {
            this.reset();
            this.agenciaCreated.emit();
            this.close();
          },
          error: (error: any) => {
            console.error('Erro ao criar agência', error);
          }
        });
      } else {
        this.agenciaService.addAgencia(formData).subscribe({
          next: () => {
            this.reset();
            this.agenciaCreated.emit();
            this.close();
          },
          error: (error: any) => {
            console.error('Erro ao criar agência:', error);
          }
        });
      }
    }
  }

  reset(): void {
    this.newAgenciaForm.reset();
    this.isEditMode = false;
    this.agenciaToEdit = null;
  }

  close() {
    this.reset();
    this.closeModal.emit();
  };

  newAgenciaForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
    telefone: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^\d{2} \d \d{4}-\d{4}$/)]),
    endereco: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required])
  });

}
