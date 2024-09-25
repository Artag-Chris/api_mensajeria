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

 ├── prisma                     # Configuración de los esquemas de prisma
 ├── src
 │   ├── app.ts                 # Punto de entrada del bot
 │   ├── config.ts                # Configuración del bot 
           └──classes                # maneja las clases dependiendo del tipo del mensaje
           └──envs                   # adapta las variables de entorno 
           └──interfaces             # interfaces para el tipado extricto de typescript
           └──keywords               # filtrado de palabras para transferencia del bot
           └──multer                 # configuracion de multer aun no implementada
           └──url                    # urls que usa el bot para notificar a la api
           └──websocket              # configuracion del websocket
 │   ├── functions                # funciones que usa el bot
 │   ├── presentation             # servicios del bot // services: logica del bot
 │        └──services                # Utilidades y funciones auxiliares
          └──whatsapp      
              └──bot.controller      # controladores del bot
 ├── .env                       # Variables de entorno
 ├── package.json               # Dependencias y scripts del proyecto
 └── tsconfig.json              # Configuración de TypeScript

Licencia:

pendiente

