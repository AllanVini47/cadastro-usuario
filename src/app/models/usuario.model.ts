export class Usuario {
  public Id: number = 0;
  public Nome: string = '';
  public DataNascimento: Date = new Date();
  public Foto: string = '';

  constructor(obj?: any) {
    this.Id = (obj && obj.Id) || 0;
    this.Nome = (obj && obj.Nome) || null;
    this.DataNascimento = (obj && obj.DataNascimento) || null;
    this.Foto = (obj && obj.Foto) || null;
  }
}
