export interface DataCambiarEstadoModel {
    id_cita: string;
    estado: string;
}

export interface CambiarEstadoModel {
    data: DataCambiarEstadoModel;
}
