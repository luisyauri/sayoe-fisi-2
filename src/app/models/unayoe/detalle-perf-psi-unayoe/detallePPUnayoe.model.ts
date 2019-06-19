/* EVALUACIÓN DE IHE */
export interface DesDescriIHEDPPUnayoeModel {
    id: number;
    titulo: string;
    contenido: string;
}

export interface DescriIHEDPPUnayoeModel {
    valor: number;
    descripcion: DesDescriIHEDPPUnayoeModel;
}

export interface IHEDPPUnayoeModel {
    id_cuest_eval: number;
    titulo_evaluacion: string;
    estado: number;
    fecha_resuelto: FechaDPPUnayoeModel;
    descripcion: DescriIHEDPPUnayoeModel[];
}

/* EVALUACIÓN DE BECK*/
export interface DescriBECKDDPPUnayoeModel {
    valor: number;
    descripcion: string;
}

export interface BECKDDPPUnayoeModel{
    id_cuest_eval: number;
    titulo_evaluacion: string;
    estado: number;
    fecha_resuelto: FechaDPPUnayoeModel;
    descripcion: DescriBECKDDPPUnayoeModel;
}

/* FIN BECK */
export interface EvaluacionesDPPUnayoeModel {
    id_cuest_eval: number;
}

export interface AlumnoDPPUnayoeModel {
    codigo: string;
    ciclo: number;
    nombre: string;
    sexo: string;
    edad: number;
    escuela: string;
    situacion: string;
}
export interface FechaDPPUnayoeModel {
    fecha: string;
    hora: string;
}
export interface PerfilDPPUnayoeModel {
    id_perfil_psico: number;
    anho: number;
    semestre: string;
    fecha_resuelto: FechaDPPUnayoeModel;
    fecha_recomendacion: FechaDPPUnayoeModel;
    recomendacion: string;
}

export interface DetallePPUnayoeModel {
    perfil: PerfilDPPUnayoeModel;
    alumno: AlumnoDPPUnayoeModel;
    evaluaciones: EvaluacionesDPPUnayoeModel[];
}
