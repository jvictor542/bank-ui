import { Routes } from '@angular/router';
import {LayoutComponent} from "@core/layout/layout.component";

export const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent
  },
  { path: '**', redirectTo: 'home' }
];
