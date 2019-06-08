
export interface EvaluacionesRealizadasModel {
    id_estado_perfil: number
    id_cuest_eval: number;
    titulo_secundario: number;
    nro_preguntas: number;
}

export interface getEPRealizadasModel {
    id_perfil_psico: number;
    anho: number;
    semestre: string;
    fecha_vencimiento: string;
    evaluaciones:EvaluacionesRealizadasModel[];
}

export interface ArrayGetEPRealizadasModel {
    data: getEPRealizadasModel[];
}



