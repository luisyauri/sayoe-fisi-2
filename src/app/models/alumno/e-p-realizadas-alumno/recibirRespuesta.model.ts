export interface Realizadas {
    id: number;
    titulo: string;
    contenido: string;
}

export interface ResultadoIHERealizadas {
    valor: number;
    descripcion: Realizadas;
}

export interface ResultadoBeckRealizadas {
    valor: number;
    descripcion: string;
}
