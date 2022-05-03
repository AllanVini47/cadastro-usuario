import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioListComponent } from './usuario.list.component';
import { routing } from './usuario.routing.module';
import { UsuarioDisplayComponent } from './display/usuario.display.component';
import { UsuarioCreateComponent } from './create/usuario.create.component';
import { UsuarioEditComponent } from './edit/usuario.edit.component';
import { UsuarioDeleteComponent } from './delete/usuario.delete.component';
import { UsuarioFormComponent } from './form/usuario.form.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    UsuarioListComponent,
    UsuarioDisplayComponent,
    UsuarioCreateComponent,
    UsuarioEditComponent,
    UsuarioDeleteComponent,
    UsuarioFormComponent,
  ],
  imports: [
    CommonModule,
    routing,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class UsuarioModule {}
