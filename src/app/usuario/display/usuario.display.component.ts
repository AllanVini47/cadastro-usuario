import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioFormComponent } from '../form/usuario.form.component';
import { UsuarioService } from '../usuario.service';

@Component({
  templateUrl: './usuario.display.component.html',
  styleUrls: ['./usuario.display.component.css'],
})
export class UsuarioDisplayComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription[] = [];
  private _id: number = 0;

  public model: Usuario = new Usuario();

  @ViewChild('formComponent', { static: false })
  formComponent!: UsuarioFormComponent;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _service: UsuarioService
  ) {}

  ngOnInit(): void {
    this._subscriptions.push(
      this._route.params.subscribe((params) => {
        this._id = +params['id'];
        this._subscriptions.push(
          this._service.getById(this._id).subscribe((res) => {
            this.model = res;
            this.formComponent.updateFormGroup(this.model);
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public onBack(): void {
    this._router.navigate(['/']);
  }
}
