
export interface AlumnosAsignarAlumnoUnayoe {
    codigo: string;
}

export interface EPAsignarAlumnoUnayoe {
    id: number;
}

export interface AsignarAlumnoUnayoe {
    alumnos: AlumnosAsignarAlumnoUnayoe[];
    test: EPAsignarAlumnoUnayoe[];
    dia: string;
    mes: string;
    anho: string;
}
