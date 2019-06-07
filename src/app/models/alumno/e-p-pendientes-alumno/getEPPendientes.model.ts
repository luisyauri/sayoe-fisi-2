
export interface estadosPerfilModel {
    id_cuest_eval: number;
    titulo_secundario: number;
    nro_preguntas: number;
}

export interface getEPPendientesModel {
    id_perfil_psico: number;
    anho: number;
    semestre: string;
    fecha_vencimiento: string;
    estadosPerfil:estadosPerfilModel[];
}

export interface ArrayGetEPPendientesModel {
    data: getEPPendientesModel[];
}



