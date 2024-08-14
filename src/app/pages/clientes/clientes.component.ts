import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {NgIf} from "@angular/common";
import {ClienteService, ICliente} from "@app/shared";
import {Router, RouterLink} from "@angular/router";
import {ClienteFormComponent} from "@app/pages/clientes/cliente-form/cliente-form.component";

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatPaginator,
    MatPrefix,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    NgIf,
    ClienteFormComponent,
    MatHeaderCellDef,
    RouterLink
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit, AfterViewInit{
  dataSource = new MatTableDataSource<ICliente>();

  sortedData!: ICliente[];

  displayedColumns: string[] = ['position', 'nome', 'telefone', 'cpf', 'actions'];

  showModal: boolean = false;

  clienteToEdit: ICliente | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clienteService: ClienteService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sortedData = this.dataSource.data;
  }

  onClienteCreated(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.getClientes().subscribe(
      {
        next: (clientes) => {
          this.dataSource.data = Object.values(clientes);
        },
        error: (err) => {
          alert("Error ao carregar clientes.");
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

    this.sortedData = data.sort((a: ICliente, b: ICliente) => {
      const isAsc = sort.direction === 'asc';
      return compare(a.nome, b.nome, isAsc);
    });
  }

  openModalNewCliente() {
    this.showModal = true;
  }

  closeModalNewCliente() {
    this.clienteToEdit = null;
    this.showModal = false;
  }

  deleteCliente(clienteId: number) {
    this.clienteService.deleteCliente(clienteId).subscribe(
      {
        next: () => {
          this.loadClientes();
        },
        error: (erro) => {
          alert("Erro ao deletar cliente.");
          console.log(erro)
        }
      }
    )
  }

  editCliente(clienteToEdit: ICliente) {
    this.clienteToEdit = clienteToEdit;
    this.openModalNewCliente();
  }

  goToClienteDetail(clienteId: number): void {
    this.router.navigate(['/home/cliente', clienteId]);
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
