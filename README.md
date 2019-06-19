# SayoeFisi

EP : Evaluación Psicológica
PS . Perfil Psicológico

## MENÚ UNAYOE 📌
* Dashboard :  Dashboard
* Evaluaciones Psicológicas : Evaluaciones Psicológicas
* Perfiles Psicológicos : Antes (Perfiles Psicológicos Pendientes)
* Recomendaciones : Antes (Pefiles Psicológicos Realizados)
* Alumnos : Alumnos
* Citas: Citas
* Estadísticas : Estadísticas

### DASHBOARD

### EVALUACIONES PSICOLÓGICAS
* Función Listar evaluaciones psicológicas. [x]
```
Título , Autor, Preguntas, Acción (Ver)
```
* Función Ver Evaluación Piscológica [x]
```
Ver todas las preguntas de una evaluación psicológica
```
* Función Seleccionar un grupo/alumno [x]
```
Seleccionará grupo o alumno para asignar tantas evaluaciones psicológicas que desee.
```
* Función Asignar
    * Sí se selecciona Grupo
    ```
    Se ingresará secciones de grupos. [En Proceso]
    ```
    * Si se selecciona Alumno [x]
    ```
    * Se ingresará lo siguiente:
    * Código, Fecha límite, Lista de Evaluaciones Psicológicas
    * Se porcederá a enviar o cancelar.
    ```    
### PERFILES PSICOLÓGICOS (Antes Perfiles Psicológicos Pendientes)
* Función Listar Perfiles Psicológicos respondidos por el estudiante. [x]
```
* Se tendrá una tabla con las sigueintes columnas.
* Código, Apellidos y nombres, Escuela, Situación, Fecha Realizada, Hora Realizada [Pendiente], Accion(Recomendar) 
```
* Función ver y recomendar un perfil psicológico. [x]
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
* Si existe 2 evaluaciones y si solo ha respondido 1, debe mostrar los resultados de la evaluación resuelta y de la no resuelta indicar "NO REALIZÓ".
* De la misma manera si no realiza ninguna indicar "NO REALIZÓ".
* Si mostrar el bloque EVALUACIONES PSICOLÓGICOS en la vista, aunque no haya realizado ninguna evaluación.
* Registrar la fecha actual al campo fecha realizada al escoger esta opción.
* No registrar una recomendación al perfil psicológico y esconder el bloque RECOMENDACIÓN de la vista de perfil psicológico.
* Sacar de la lista de perfiles psicológicos no culminados e ingresarlas a la lista de recomendados.
```
### RECOMENDACIONES
* Función Listar Perfiles Psicológicos [x]
```
* Se listará los perfiles psicológicos que han sido marcados como culminados, con o sin recomendación.
* Con los siguientes datos:
    * Código, Apellidos y nombres, Escuela, Situación, Fecha Realizada, Hora Realizada [Pendiente], Acción (Ver perfil psicológico)
```
* Función Ver perfil psicológico culmminado [x]
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
* Si agrega Individual se insertará los siguientes campos:
    * Código
    * DNI
    * Correo
    * Contraseña
    * Apellido paterno
    * Apellido materno
    * Nombres
    * Sexo
    * Fecha Nacimiento
    * Situación
    * Año de ingreso
    * Estado de permanencia
    * Escuela Profesional
* Si agrega un excel se insertará los siguientes campos:
    * Por definir.
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
### PERFIL DE UN ALUMNO
* Función mostrar data de un alumno
```
* Se mostrará la siguiente información.
    * Nombres, edad, sexo, codigo, ciclo, escuela, situación, correo, wsp y más que tenga.    
```
* Función modificar modificar datos
```
* Podrá modificar todos sus datos del alumno.
```
* Función Listar perfiles psicológicos culminados
```
* Se listará los perfiles psicológicos culminados en una tabla
* Con lo siguiente:
    * año, semestre, fecha realizada, hora realizada, Acción (Ver)
```
* Función Ver Perfil psicológico
```
* Se visualizará el perfil psicológico seleccionado.
```
### CITAS
* Función Agregar cita
```
* Agrega una cita a un alumno ingresando los siguientes datos:
    * Código
        * Apellidos nombres
        * Situación
        * Escuela 
    * Asunto 
    * Fecha y hora
    * Descripción
```
* Función Listar citas           
```
* Se listará las citas y se mostrará en una tabla con los siguientes campos:
    * Asunto, fecha, hora, Apellidos y nombres, estado, Accion (Ver)
```
* Función Cambiar estado
```
*  Mostará una vista donde se escogerá la opción de "NO ASISTIÓ" "ESPERANDO" "ASISTIÓ".

1 ESPERANDO POR DEFECTO
2 ASISTIÓ
3 NO ASISTIÓ
``` 
* Función Ver detalles de una cita
```
* Mostrará los detalles de una cita, con lo datos siguientes:
    * Asunto, descripción, fecha, hora, estado, código, apellido y nombres, edad, sexo,
```

## MENÚ ALUMNO 📌
* Dashboard 
* Evaluaciones Pendientes
* Evaluaciones Realizadas
* Perfil Psicológico
* Citas

### EVALUACIONES PENDIENTES
* Listo
### EVALUACIONES REALIZADAS
* Listo
### PERFIL PSICOLÓGICO
* Función Listar perfil psicológico. 
```
* Se listará los perfiles psicológicos realizados solo ese semestre en una tabla
* Con los siguientes datos:
    * Fecha Emisión Hora Emisión Accion(Ver)
``` 
*Función Ver Perfil Psicológico
```
* Podrá ver sus resultados de su evaluación psicológica de una forma más personalizada y disitinta que unayoe.
``` 
### Citas
* Función Listar citas
```
* Se mostrarán en una lista todas las citas con difenrtes estados.
* Con los siguientes datos en la tabla:
    * Asunto Fech Hora Acción (Ver)
```       
* Función ver Detalle Cita
```
* Se mostrará una ventará emergente con los siugientes datos de la cita
    * Asunto descripción, fecha hora.
``` 


OBSERVAR BANDERA 0
ESCRIBIR BANDERA 1
RECOMENDACIÓN

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
