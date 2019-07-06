export interface FechaResueltoGetListPRUnayoeModel {
    fecha: string;
    hora: string;
}

export interface FechaReccomendacionGetListPRUnayoeModel {
    fecha: string;
    hora: string;
}
export interface PerfilesListPRUnayoeModel {
    id_perfil_psico: number;
    fecha_resuelto: FechaResueltoGetListPRUnayoeModel;
    fecha_recomendacion: FechaReccomendacionGetListPRUnayoeModel
    nombre: string;
    codigo: string;
    escuela: string;
    situacion: string;
    recomendacion: string;
}
export interface GetListPRUnayoeModel {
    anho: string;
    semestre: string;
    perfiles: PerfilesListPRUnayoeModel[];
}

export interface ArrayGetListPRUnayoeModel {
    data: GetListPRUnayoeModel[]
}
