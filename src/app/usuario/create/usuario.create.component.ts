import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  templateUrl: './usuario.create.component.html',
  styleUrls: ['./usuario.create.component.css'],
})
export class UsuarioCreateComponent implements OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor(private _router: Router, private _service: UsuarioService) {}

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public onSubmit(usuario: Usuario): void {
    this._subscriptions.push(
      this._service.postUsuario(usuario).subscribe(() => this.onBack())
    );
  }

  public onBack(): void {
    this._router.navigate(['/']);
  }
}
