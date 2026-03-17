# node_express_project


Descripcion:

Aplicación web backend desarrollada con Node.js y Express para la gestión de usuarios y datos. Este proyecto corresponde a la primera parte (Módulo 6)

Este proyecto integra:
- Es Modules para trabajar con una sintaxis moderna.
- Servidor HTTP con Express.js
- Persistencia de datos en archivos JSON
- Registro de accesos en archivo de logs
- Arquitectura modular con controllers, routes y services

Estructura de carpetas:
(usamos una estructura controller/routes/services, para tener una buena arquitectura backend)

node_express_project/
├── src/
│   ├── app.js                  
│   ├── controllers/           
│   │   └── userController.js  
│   ├── routes/                
│   │   └── userRoutes.js      
│   ├── services/               
│   │   ├── logService.js      
│   │   └── userService.js     
│   └── data/                    
│       ├── users.json         
│       └── log.txt            
├── public/                                    
├── package.json               
└── README.md                  

Instrucciones de uso:

- Primero vamos a ejecutar el servidor, podemos usar nodemon, "npm run dev" en la terminal bash
- Junto con el PORT van a haber 6 usuarios ya ingresados.
- En la consola bash vamos a abrir el PORT, para eso justo arriba de la tabla de usuarios encontraremos la siguiente linea "Servidor escuchando en http://localhost:3000". haremos click con CTRL sobre el localhost:3000. Esto abrira el puerto en nuestro navegador, por cada inicio en el navegador, se creara un control de registro en logs.txt.
- Para encontrar un usuario espeficio usamos su id, ej "http://localhost:3000/api/users/1" donde la ID es "1".
-Por ahora si queremos agregar otro usuario podemos directamente modificando el json en carpeta data/ o abrir un segundo terminal bash mientras el servidor este abierto y escribir el siguiente comando
"curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nombre": "(ejempo nombre)", "email": "(ej email)@gmail.com"}'"

Requicitos del sistema:

- Node.js v18 o superior
- npm (incluido con Node.js)

