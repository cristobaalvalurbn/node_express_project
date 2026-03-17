
// IMPORTACION DE DEPENDENCIAS Y CONTROLADORES
// Importa Router de Express para crear un enrutador modular
import { Router } from 'express';

// Importa las funciones controladoras que definimos en userController.js
import { 
    getUsersController, 
    getUserByIdController, 
    createUserController 
} from '../controllers/userController.js';

// CONFIGURACION DEL ROUTER
// Crea una nueva instancia de Router, que funcionara como un mini-servidor para estas rutas
const router = Router();

// DEFINICION DE RUTAS
// Define ruta GET para '/' -> cuando se acceda a /api/users, ejecuta getUsersController
// Esta ruta devuelve la lista completa de usuarios
router.get('/', getUsersController);

// Define ruta GET para '/:id' -> cuando se acceda a /api/users/1, ejecuta getUserByIdController
// El parametro :id se captura en req.params.id y se pasa al controlador
router.get('/:id', getUserByIdController);

// Define ruta POST para '/' -> cuando se envie POST a /api/users, ejecuta createUserController
// Esta ruta crea un nuevo usuario con los datos enviados en el body de la peticion
router.post('/', createUserController);

// EXPORTACION DEL MODULO
// Exporta el router como modulo por defecto para que pueda ser importado en app.js
export default router;