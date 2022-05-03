import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario.form.component.html',
  styleUrls: ['./usuario.form.component.css'],
})
export class UsuarioFormComponent implements OnInit {
  @Input() isCreate?: boolean = false;
  @Input() readonly?: boolean = false;
  @Input() submitText: string = 'Submit';
  @Input() model: Usuario = new Usuario({
    Id: 1,
    Nome: 'a',
    DataNascimento: new Date(),
    Foto: '',
  });

  @Output() onSubmitClicked: EventEmitter<Usuario> = new EventEmitter<Usuario>();
  @Output() onBackClicked: EventEmitter<void> = new EventEmitter<void>();

  public usuarioForm: FormGroup = new FormGroup({});

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.usuarioForm = this._formBuilder.group({
      Id: this._formBuilder.control([this.model.Id]),
      Nome: this._formBuilder.control(
        [this.model.Nome],
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ),
      DataNascimento: this._formBuilder.control([
        this.model.DataNascimento,
        [Validators.required],
      ]),
      Foto: this._formBuilder.control([this.model.Foto]),
    });
  }

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      let reader = new FileReader();

      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

      reader.onload = () => {
        this.usuarioForm.get('Foto')?.patchValue(reader.result as string);
        this.model.Foto = reader.result as string;
      }

      reader.readAsDataURL(file);
    }
  }

  public onSubmit(){
    const usuario = this.usuarioForm.value as Usuario;
    this.onSubmitClicked.emit(usuario);
  };

  public onBack(){
    this.onBackClicked.emit();
  };
}
