export class Revista {
  constructor(
    public _id: String,
    public autor: String,
    public titulo: String,
    public edicion: Number,
    public descripcion: String,
    public frecuenciaActual: String,
    public ejemplares: Number,
    public temas: [],
    public palabrasClave: [],
    public copias: Number,
    public disponibles: Number
  ) {}
}
