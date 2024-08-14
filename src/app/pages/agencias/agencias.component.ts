import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {AgenciaService, IAgencia} from "@app/shared";
import {MatSort, MatSortModule, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AgenciaFormComponent} from "@app/pages/agencias/agencia-form/agencia-form.component";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-agencias',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    AgenciaFormComponent,
    CommonModule,
    MatPaginator
  ],
  templateUrl: './agencias.component.html',
  styleUrl: './agencias.component.scss'
})
export class AgenciasComponent implements OnInit, AfterViewInit{

  dataSource = new MatTableDataSource<IAgencia>();

  sortedData!: IAgencia[];

  displayedColumns: string[] = ['position', 'nome', 'telefone', 'endereco', 'actions'];

  showModal: boolean = false;

  agenciaToEdit: IAgencia | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private agenciaService: AgenciaService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadAgencias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sortedData = this.dataSource.data;
  }

  onAgenciaCreated(): void {
    this.loadAgencias();
  }

  loadAgencias() {
    this.agenciaService.getAgencias().subscribe(
      {
        next: (agencias) => {
          this.dataSource.data = Object.values(agencias);
        },
        error: (err) => {
          alert("Error ao carregar agências.");
          console.log(err)
        }
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: IAgencia, b: IAgencia) => {
      const isAsc = sort.direction === 'asc';
      return compare(a.nome, b.nome, isAsc);
    });
  }

  openModalNewAgencia() {
    this.showModal = true;
  }

  closeModalNewAgencia() {
    this.agenciaToEdit = null;
    this.showModal = false;
  }

  deleteAgencia(agenciaId: number) {
    this.agenciaService.deleteAgencia(agenciaId).subscribe(
      {
        next: () => {
          this.loadAgencias();
        },
        error: (erro) => {
          alert("Erro ao deletar agencia.");
          console.log(erro)
        }
      }
    )
  }

  editAgencia(agenciaToEdit: IAgencia) {
    this.agenciaToEdit = agenciaToEdit;
    this.openModalNewAgencia();
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
