export class Usuario {
  constructor(
    public _id: String,
    public carnetCUI: Number,
    public nombres: String,
    public apellidos: String,
    public username: String,
    public rol: String,
    public email: String,
    public password: String
  ) {}
}
