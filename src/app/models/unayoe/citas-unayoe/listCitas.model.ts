export interface AlumnoListCitasModel {
    codigo: string;
    ciclo: string;
    nombre: string;
    sexo: string;
    edad: string;
    escuela: string;
    situacion: string;
}

export interface ListCitasModel {
    id: number;
    asunto: string;
    fecha: string;
    estado: number;
    hora: string;
    descripcion: string;
    alumno: AlumnoListCitasModel;
}
