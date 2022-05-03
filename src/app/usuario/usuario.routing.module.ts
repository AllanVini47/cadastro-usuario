import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioCreateComponent } from './create/usuario.create.component';
import { UsuarioDeleteComponent } from './delete/usuario.delete.component';
import { UsuarioDisplayComponent } from './display/usuario.display.component';
import { UsuarioEditComponent } from './edit/usuario.edit.component';
import { UsuarioListComponent } from './usuario.list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: UsuarioListComponent },
  { path: 'display/:id', component: UsuarioDisplayComponent },
  { path: 'create', component: UsuarioCreateComponent },
  { path: 'edit/:id', component: UsuarioEditComponent },
  { path: 'delete/:id', component: UsuarioDeleteComponent },
];

export const routing = RouterModule.forChild(routes);
