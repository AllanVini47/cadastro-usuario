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
  @Input() isDelete?: boolean = false;
  @Input() readonly?: boolean = false;
  @Input() submitText: string = 'Submit';
  @Input() model: Usuario = new Usuario();

  @Output() onSubmitClicked: EventEmitter<Usuario> = new EventEmitter<Usuario>();
  @Output() onBackClicked: EventEmitter<void> = new EventEmitter<void>();

  public usuarioForm: FormGroup = new FormGroup({});

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.usuarioForm = this._formBuilder.group({
      id: this._formBuilder.control(this.model.id),
      nome: this._formBuilder.control(
        this.model.nome,
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ),
      dataNascimento: this._formBuilder.control(
        this.model.dataNascimento,
        [Validators.required],
      ),
      foto: this._formBuilder.control(this.model.foto),
    });
  }

  public updateFormGroup(model: Usuario): void  {
    this.model = model;
    this.usuarioForm.patchValue(this.model);
  }

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      let reader = new FileReader();

      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

      reader.onload = () => {
        this.usuarioForm.get('foto')?.patchValue(reader.result as string);
        this.model.foto = reader.result as string;
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
