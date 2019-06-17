export interface PerfilesListPRUnayoeModel {
    id_perfil_psico: number;
    fecha_resuelto: string;
    nombre: string;
    codigo: string;
    escuela: string;
    situacion: string;
}
export interface GetListPRUnayoeModel {
    anho: string;
    semestre: string;
    perfiles: PerfilesListPRUnayoeModel[];
}

export interface ArrayGetListPRUnayoeModel {
    data: GetListPRUnayoeModel[]
}
