export interface AlternativasGetUnaEPModel {
    id: number;
    descripcion: string;
    puntuacion: number;
    id_pregunta: number;
}

export interface PreguntasGetUnaEPModel {
    id: number;
    pregunta: string;
    bloque: number;
    alternativas: AlternativasGetUnaEPModel[];
}

export interface GetUnaEPModel {
    id: string;
    titulo: string;
    titulo_secundario: string
    autor: string;
    nro_preguntas: number;
    preguntas: PreguntasGetUnaEPModel[];
}
