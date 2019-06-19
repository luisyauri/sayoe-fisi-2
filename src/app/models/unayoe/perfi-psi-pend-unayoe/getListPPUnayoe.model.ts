export interface FechaListPPUnayoeModel {
   fecha: string;
   hora: string;
}

export interface PerfilesListPPUnayoeModel {
    id_perfil_psico: number;
    fecha_resuelto: FechaListPPUnayoeModel;
    nombre: string;
    codigo: string;
    escuela: string;
    situacion: string;
}
export interface GetListPPUnayoeModel {
    anho: string;
    semestre: string;
    perfiles: PerfilesListPPUnayoeModel[];
}

export interface ArrayGetListPPUnayoeModel {
    data: GetListPPUnayoeModel[]
}

