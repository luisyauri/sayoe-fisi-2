
    export interface Usuario {
        id: number;
        correo: string;
        estado: number;
        autenticado: number;
        ultima_sesion: string;
        id_rol: number;
    }

    export interface Data {
        id: number;
        nombre: string;
        apellido_paterno: string;
        apellido_materno: string;
        profesion: string;
        facebook: string;
        celular: string;
        correo: string;
        wsp: string;
        foto: string;
        auto_descripcion: string;
        facultad: string;
        usuario: Usuario;
    }

    export interface RootObject {
        data: Data[];
    }
