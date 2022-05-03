export class Usuario {
  public id: number = 0;
  public nome: string = '';
  public dataNascimento: Date = new Date();
  public foto: string = '';

  constructor(obj?: any) {
    this.id = (obj && obj.id) || 0;
    this.nome = (obj && obj.nome) || null;
    this.dataNascimento = (obj && obj.dataNascimento) || null;
    this.foto = (obj && obj.foto) || null;
  }
}
