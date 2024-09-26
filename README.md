Documentación del Proyecto Índice

    Introducción
    Requisitos Previos
    Instalación
    Configuración
    Uso
    Estructura del Proyecto
    Licencia

Introducción:

Este proyecto es una api desarrollada en Node.js con TypeScript se encarga del guardado de mensajes de usuarios que escriben a el bot y tambien se encarga de enviar las respuestas a meta
tiene conexion websocket con el bot y el front-end  

Requisitos Previos

    Node.js v18.19.1
    npm v18.19.1
    Cuenta de Meta con permisos para colocar el token de autentificacion 
    https://developers.facebook.com/

Instalación

    Clona el repositorio:

     git clone https://github.com/Artag-Chris/api_mensajeria
     cd tu-repositorio

Instala las dependencias:

    npm install

Configuración:

    1. renombra al archivo .env.template en .env y configura las variables de entorno

    2.  actualiza el token de autenticación que obtuviste de meta.

Uso:

Para iniciar la api, ejecuta el siguiente comando:

    npm run dev

aun no se ha creado la build de producción

Estructura del Proyecto

    ├── prisma                    # Configuración de los esquemas de prisma
    ├── src
    │   ├── app.ts                # Inicia el servidor 
    │   ├── config                # Configuración de las url 
           └── urls                   # url que consulta el servidor
        └── envs                    # adapta las variables de entorno 
        └── uuid.adapter.ts         # para crear id Unicas
        └── domain                # relacionado con Dto funciones del server interfaces
           └──dto                   # data transfer object
           └──funciones             # funciones que usa el server
           └──interfaces            # para tipado estricto
    │   ├── notifications         # relacionado con el websocket
    │   ├── presentation          # presentacion del server. relacionado con las rutas, controladores y servicios 
    │        └──services            # logica de los servicios de whatsapp
        └──whatsapp      
              └── whatsappcontrollers     # controladores de las rutas del whatsapp
              └── whatsapproutes          # rutas del whatsapp
        └── routes                # rutas base que usa el server
        └── server                # configuraciones del servidor relacionado con cors capacidad de descarga formatos recividos y rutas implementadas
        └── prisma                # relacionado con las rutas de la base de datos
            └── prismacontroller    # controlador de las rutas para la base de datos
            └── prismaroutes        # rutas de la base de datos
            └── prismaservicios     # logica de la base de datos
    ├── .env                       # Variables de entorno
    ├── package.json               # Dependencias y scripts del proyecto
    └── tsconfig.json              # Configuración de TypeScript

Licencia:

pendiente

