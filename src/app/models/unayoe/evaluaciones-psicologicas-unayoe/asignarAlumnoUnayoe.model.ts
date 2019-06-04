
export interface AlumnosAsignarAlumnoUnayoe {
    codigo: string;
}

export interface TestAsignarAlumnoUnayoe {
    id: number;
}

export interface AsignarAlumnoUnayoe {
    alumnos: AlumnosAsignarAlumnoUnayoe[];
    test: TestAsignarAlumnoUnayoe[];
    fecha_limite: string;
}
