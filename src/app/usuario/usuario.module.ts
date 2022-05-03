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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';

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
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [MatDatepickerModule, {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},],
})
export class UsuarioModule {}
