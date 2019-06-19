export interface ContentDesEvaluacionesRealizadasModel {
    contenido: string;
    id: number;
    titulo: string;
}
export interface DesEvaluacionesRealizadasModel {
    descripcion: ContentDesEvaluacionesRealizadasModel;
    valor: number;
}
export interface FechaEvaluacionesRealizadasModel {
  fecha: string;
  hora: string;
}

export interface EvaluacionesRealizadasModel {
    id_estado_perfil: number
    id_cuest_eval: number;
    titulo_secundario: number;
    nro_preguntas: number;
    descripcion: DesEvaluacionesRealizadasModel;
    fecha_resuelto: FechaEvaluacionesRealizadasModel;
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



