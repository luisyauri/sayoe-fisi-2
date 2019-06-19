export interface FechaListEPModel {
    fecha: string;
    hora: string;
}
export interface ListEPModel {
    anho: number;
    fecha_recomendacion: FechaListEPModel;
    fecha_resuelto: FechaListEPModel;
    id_perfil_psico: number;
    semestre: number;
}
