
// Importa el framework Express para crear el servidor HTTP y manejar rutas
import express from 'express';

// Importa dotenv para cargar variables de entorno desde el archivo .env
import dotenv from 'dotenv';

// Importa fileURLToPath para trabajar con rutas en Modules
import { fileURLToPath } from 'url';

// Importa dirname y join de'path' para generar rutas de archivo
import { dirname, join } from 'path';

//MODULOS PROPIOS
// Importa la funcion registrarVisita desde logService para registrar accesos
import { registrarVisita } from './services/logService.js';

// Importa la funcion mostrarUsuariosEnConsola desde userService
import { mostrarUsuariosEnConsola } from './services/userService.js';

// Importa el router de usuarios
import userRoutes from './routes/userRoutes.js';

// Carga las variables desde .env
dotenv.config();

// Reconstruye __dirname en ES Modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//INSTANCIA PARA APP EXPRESS
const app = express();

// Define el puerto:
const PORT = process.env.PORT || 3000;


// MIDDLEWARES

// Middleware que parsea el cuerpo de las peticiones con formato JSON
app.use(express.json());

// extended: true permite parsear objetos anidados usando la libreria qs
app.use(express.urlencoded({ extended: true }));

// Middleware que sirve archivos estaticos desde la carpeta 'public' ubicada en la raiz del proyecto
// join(__dirname, '..', 'public') construye la ruta absoluta: ../public desde src/
app.use(express.static(join(__dirname, '..', 'public')));

// Middleware personalizado que se ejecuta en cada peticion para registrar la visita
app.use((req, res, next) => {
    // Llama a registrarVisita pasando la ruta accedida (req.path)
    registrarVisita(req.path);
    // next() pasa el control al siguiente middleware o ruta
    next();
});

// Define una ruta GET para la raiz del sitio (/)
app.get('/', (req, res) => {
    // Envía una respuesta JSON con un mensaje de bienvenida y estado OK
    res.json({ 
        message: 'Bienvenido a la API',
        status: 'OK'
    });
});

// Define una ruta GET para verificar el estado del servidor (/status)
app.get('/status', (req, res) => {
    // Envía una respuesta JSON con informacion del estado, timestamp y tiempo de actividad
    res.json({
        status: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Monta el router de usuarios bajo el prefijo /api/users
// Todas las rutas definidas en userRoutes se accederan como /api/users/*
app.use('/api/users', userRoutes);

// INICIO DEL SERVIDOR
// Inicia el servidor HTTP y lo pone a escuchar en el puerto definido
// El callback se ejecuta cuando el servidor esta listo para aceptar conexiones
app.listen(PORT, () => {
 // Imprime en consola la URL de acceso al servidor
    console.log(`\nServidor escuchando en http://localhost:${PORT}`);
    
// Llama a la funcion que muestra los usuarios
    mostrarUsuariosEnConsola();
});

// EXPORTACION DEL MODULO

// Exporta la instancia 'app' como modulo por defecto para permitir tests o imports externos
export default app;