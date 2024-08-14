import { Routes } from '@angular/router';
import {LayoutComponent} from "@core/layout/layout.component";
import {ClientesComponent} from "@app/pages/clientes/clientes.component";
import {AgenciasComponent} from "@app/pages/agencias/agencias.component";
import {ClienteDetailComponent} from "@app/pages/clientes/cliente-detail/cliente-detail.component";

export const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'agencias', pathMatch: 'full' },
      { path: 'agencias', component: AgenciasComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'cliente/:id', component: ClienteDetailComponent}
    ]
  },
  { path: '**', redirectTo: 'home' }
];
