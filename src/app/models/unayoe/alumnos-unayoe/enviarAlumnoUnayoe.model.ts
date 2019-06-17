export interface DataEnviarAlumnoUnayoeModel {
    dni: string;
    nombre: string;
    apellido_materno: string;
    apellido_paterno: string;
    sexo: string;
    fecha_nacimiento: string;
    correo: string;
    contrasenha: string;
    codigo: string;
    situacion: string;
    anho_ingreso: string;
    estado_permanencia: string;
    id_escuela: string;
}

export interface EnviarAlumnoUnayoeModel {
    data: DataEnviarAlumnoUnayoeModel;
}
