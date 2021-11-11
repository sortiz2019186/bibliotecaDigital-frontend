export class Libro {
  constructor(
    public _id: String,
    public autor: String,
    public titulo: String,
    public edicion: Number,
    public palabrasClave: [],
    public descripcion: String,
    public temas: [],
    public copias: Number,
    public disponibles: Number
  ) {}
}
