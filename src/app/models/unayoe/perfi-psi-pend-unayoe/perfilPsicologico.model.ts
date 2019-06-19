export interface IHEDADEPPModel {
    id: number;
    titulo: string;
    contenido: string;
}

export interface IHEDEPPModel {
    valor: number;
    descripcion: IHEDADEPPModel;
}

export interface IHEEPPModel {
    id_cuest_eval: number;
    descripcion: IHEDEPPModel[]
}

export interface BECKDEPPModel {
    valor: number;
    descripcion: string;
}

export interface BECKEPPModel {
    id_cuest_eval: number;
    descripcion: BECKDEPPModel;
}

export interface AlumnoPPModel {
    codigo: string;
    ciclo: string;
    nombre: string
    sexo: number;
    edad: number;
    escuela: string;
    situacion: string;
}

export interface ESPPModel {
    id_cuest_eval: number;
}
export interface PerfilPPModel {
    id_perfil_psico: number;
    recomendacion: string;
    semestre: number;
    anho: number;
}

export interface PPModel {
    alumno: AlumnoPPModel;
    evaluaciones: ESPPModel[];
    perfil: PerfilPPModel;
}

// EPP Evaluacion de Perfil Psicológico
