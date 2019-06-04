
export interface AlternativasEvalPsicoUnayoe{
    id: number;
    descripcion: string;
    puntuacion: number;
    id_pregunta :number
}

export interface PreguntasEvalPsicoUnayoe{
    id: number;
    pregunta: string;
    alternativas : AlternativasEvalPsicoUnayoe;
}

export interface EvalPsicoUnayoe {
    id: number;
    titulo: string;
    autor: string;
    nro_preguntas: number;
    preguntas: PreguntasEvalPsicoUnayoe;
}

export interface SendDatosDialogUnayoe{
    selected: number;
    dataEvalPsi : EvalPsicoUnayoe;
}
