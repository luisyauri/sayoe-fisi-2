# SayoeFisi

EP : Evaluación Psicológica
PS . Perfil Psicológico

## MENÚ UNAYOE 📌
* Dashboard : Dashboard
* Evaluaciones Psicológicas : Evaluaciones Psicológicas
* Perfiles Psicológicos : Perfiles Psicológicos Pendientes
* Recomendaciones : Pefiles Psicológicos Realizados
* Alumnos : Alumnos
* Citas: Citas
* Estadísticas : Estadísticas

### DASHBOARD

### EVALUACIONES PSICOLÓGICAS
* Función Listar evaluaciones psicológicas. 
```
Título , Autor, Preguntas, Acción (Ver)
```
* Función Ver Evaluación Piscológica
```
Ver todas las preguntas de una evaluación psicológica
```
* Función Seleccionar un grupo/alumno
```
Seleccionará grupo o alumno para asignar tantas evaluaciones psicológicas que desee.
```
* Función Asignar
    * Sí se selecciona Grupo
    ```
    Se ingresará Excel.
    ```
    * Si se selecciona Alumno
    ```
    * Se ingresará lo siguiente:
    * Código, Fecha límite, Lista de Evaluaciones Psicológicas
    * Se porcederá a enviar o cancelar.
    ```    
### PERFILES PSICOLÓGICOS (Antes Perfiles Psicológicos Pendientes)
* Función Listar Perfiles Psicológicos respondidos por el estudiante.
```
* Se tendrá una tabla con las sigueintes columnas.
* Código, Apellidos y nombres, Escuela, Situación, Fecha Realizada, Hora Realizada, Accion(Recomendar)
```
* Función ver y recomendar un perfil psicológico.
```
* Permitrá ver un Perfil Psicológico y a la vez escribir una recomendación.
* Lo siguiente será mostrada en el perfil psicológico seleccionado:
    * Datos Generales
        * Nombres, Edad, Sexo, Código, Ciclo, Escuela, Situación.
    * Evaluaciones Psicológicas
        * Inventario de Hábitos de Estudi
        * Inventario de Depresión de Beck
    * Recomendación
        * Input para poder escribir una recomendación.
    * Enviar/Cancelar
```
* Función ver Perfiles Psicológicos No Culminados
```
Se le enviará a una vista con la lista de los perfiles psicológicos aun no culminados por el alumno.
```    
#### PEFILES PSICOLÓGICOS NO CULMINADOS
* Función Listar Perfiles Psicológicos No culminados
```
* Se tendrá una tabla con las siguientes columnas.
* Código, Apellidos y nombres, Escuela, Situación, Acciones(Ver Perfil Psicológico, Enviar Recordatorio, Finalizar Perfil Psicológico)
```
* Función Ver Perfil psicológico
```
* Se podrá solo ver el perfil psicológico del alumno seleccionado, más no modificar.
* Ver solo hasta las evaluaciones que ha realizado.
```
* Función Enviar Recordatorio
```
Se enviará un recordatorio al correo del alumno indicando la Fecha Límite. (Recomendación usar un servicio de la nube).
```
* Función Finalizar Perfil Psicológico
```
* Finalizar un perfil psicológico de la siguiente manera.
* Si existe 2 evaluaciones y si solo ha respondido 1, debe mostrar los resultados de la evaluación resulta y de la no resuleta indicar "NO REALIZÓ".
* De la misma manera si no realiza ninguna indicar "NO REALIZÓ".
* Si mostrar el bloque EVALUACIONES PSICOLÓGICOS en la vista, aunque no haya realizado ninguna evaluación.
* Registrar la fecha actual al campo fecha realizada al escoger esta opción.
* No registrar una recomendación al perfil psicológico y esconder el bloque RECOMENDACIÓN de la vista de perfil psicológico.
* Sacar de la lista de perfiles psicológicos no culminados e ingresarlas a la lista de recomendados.
```
### RECOMENDACIONES
* Función Listar Perfiles Psicológicos
```
* Se listará los perfiles psicológicos que han sido marcados como culminados, con o sin recomendación.
* Con los siguientes datos:
    * Código, Apellidos y nombres, Escuela, Situación, Fecha Realizada, Hora Realizada, Acción (Ver perfil psicológico)
```
* Función Ver perfil psicológico culmminado
```
* Se mostrará el perfil psicológico de un alumno más no podrá editar.
```
### ALUMNOS
* Función Seleccionar Excel o Individual
```
Seleccionaremos la opción excel o individual para agregar alumno en el sistema.
```
* Función agregar
```

```
* Función Listar Alumnos
```
* Se listará todos los alumnos con situación de permanencia activa 
* Con los siguientes datos:
    * Código, Apellidos y nombres, Escuela, Situación, Sexo, Edad, Accion(Ver)
```
* Función Ver Perfil de un alumno
```
Se seleccionará un botón de ver de un alumno y nos dirigirá a una ventana
donde mostrará el perfil de un alumno.
```



```

```
```

```
```

```
       
MENÚ ALUMNO



## Botones Colores

Primary (Todos los botones a primera vista)
#5867dd
Success (Todos los botones para enviar datos)
#0abb87
Warning (ATENCIÓN)
#ffb822
Danger (Todos los botones para cancelar)
#fd397a
Marca
#5d78ff
Dark
#282a3c


Titulos
#464457
Contenido
#6c7293
Hipervinculos
#5d78ff;


FONDO
#646c9a

NAME
#6c7293

Titulo 
14px

https://fontawesome.com/icons/angry?style=regular
