export interface AcadémicosDataAlumnoUnayoeModal{
    codigo: string;
    ciclo: number;
    situacion: number;
    promedio: number;
    anho_ingreso: number;
    estado_permanencia: number;
    total_creditos: number;
    escuela_profesional:string;
    facultad: string;
}

export interface DataDataAlumnoUnayoeModal {
    dni: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    sexo: string;
    fecha_nacimiento: string;
    edad: number;
    foto: string;
    telefono: string;
    celcular: string;
    direccion: string;
    correo_personal;
}

export interface DataAlumnoUnayoeModal {
    datos_personales: DataDataAlumnoUnayoeModal;
    datos_academicos: AcadémicosDataAlumnoUnayoeModal;
    usuario: string;
}
