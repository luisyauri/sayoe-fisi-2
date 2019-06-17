

export interface TotalIHE {
    id: number;
    titulo: string;
    contenido: string;
}

export interface ResultadoIHE {
    valor: number;
    descripcion: TotalIHE;
}

export interface EncuestaIHEModel {
    id_cuest_eval: number;
    resultado: ResultadoIHE;
}

export interface ResultadoBeck {
    valor: number;
    descripcion: string;
}

export interface EncuestaBeckModel {
    id_cuest_eval: number;
    resultado: ResultadoBeck;
}

export interface IdCuestionarioModel {
    id_cuest_eval: number;
}
