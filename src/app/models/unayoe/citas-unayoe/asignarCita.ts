export interface DataAsignarCita {
    codigo: string;
    asunto: string;
    fecha_hora: string;
    descripcion: string;
    id_unayoe_perfil: number;
}

export interface AsignarCita {
    data: DataAsignarCita;
}
