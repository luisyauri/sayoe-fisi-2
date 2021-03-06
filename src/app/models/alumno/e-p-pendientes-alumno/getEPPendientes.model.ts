
export interface EvaluacionesPendientesModel {
    id_estado_perfil: number
    id_cuest_eval: number;
    titulo_secundario: number;
    nro_preguntas: number;
}

export interface getEPPendientesModel {
    id_perfil_psico: number;
    anho: number;
    semestre: string;
    fecha_vencimiento: string;
    evaluaciones:EvaluacionesPendientesModel[];
}

export interface ArrayGetEPPendientesModel {
    data: getEPPendientesModel[];
}



