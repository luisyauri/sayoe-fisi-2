export interface AcadémicosDatosAlumnoModel{
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

export interface DataDatosAlumnoModel {
    dni: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    sexo: string;
    fecha_nacimiento: string;
    edad: number;
    foto: string;
    telefono: string;
    celular: string;
    direccion: string;
    correo_personal;
}
export interface Correo {
    correo_principal: string;
}

export interface DatosAlumnoModel {
    datos_personales: DataDatosAlumnoModel;
    datos_academicos: AcadémicosDatosAlumnoModel;
    usuario: Correo;
}
