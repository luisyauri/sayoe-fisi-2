export interface PerfilesListPNCUnayoeModel {
    id_perfil_psico: number;
    nombre: string;
    codigo: string;
    escuela: string;
    situacion: string;
}
export interface GetListPNCUnayoeModel {
    anho: string;
    semestre: number;
    perfiles: PerfilesListPNCUnayoeModel[];
}

export interface ArrayGetListPNCUnayoeModel {
    data: GetListPNCUnayoeModel[]
}

