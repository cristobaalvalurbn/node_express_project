
// IMPORTACION DE SERVICIOS
// Importa las funciones del servicio de usuarios que manejan la logica de negocio
import { 
    obtenerTodosLosUsuarios, 
    buscarUsuarioPorId,
    agregarUsuario 
} from '../services/userService.js';

// CONTROLADOR: Obtener todos los usuarios
// Define la funcion que maneja la peticion GET para listar todos los usuarios
// Recibe req (peticion) y res (respuesta) como parametros
export function getUsersController(req, res) {
    // Llama al servicio para obtener todos los usuarios y guarda el resultado
    const resultado = obtenerTodosLosUsuarios();
    // Envía el resultado como respuesta JSON al cliente
    res.json(resultado);
}

// CONTROLADOR: Obtener usuario por ID

// Define la funcion que maneja la peticion GET para obtener un usuario por su ID
export function getUserByIdController(req, res) {
    // Bloque try-catch para manejar errores de forma controlada
    try {
        // Llama al servicio buscando el usuario con el ID recibido en los parametros de la ruta
        const resultado = buscarUsuarioPorId(req.params.id);
        // Si se encuentra, envía el resultado como JSON
        res.json(resultado);
    } catch (error) {
        // Si ocurre un error (ej: usuario no encontrado), envía respuesta 404 con mensaje de error
        res.status(404).json({
            status: 'error',
            message: error.message
        });
    }
}

// CONTROLADOR: Crear nuevo usuario
// Define la funcion que maneja la peticion POST para crear un nuevo usuario
export function createUserController(req, res) {
    // Extrae las propiedades 'nombre' y 'email' del cuerpo de la peticion (req.body)
    const { nombre, email } = req.body;
    
    // Validacion basica: verifica que ambos campos esten presentes
    if (!nombre || !email) {
        // Si faltan campos, envía respuesta 400 (Bad Request) con mensaje descriptivo
        return res.status(400).json({
            status: 'error',
            message: 'Nombre y email son requeridos'
        });
    }
    
    // Llama al servicio para agregar el nuevo usuario con los datos recibidos
    const resultado = agregarUsuario({ nombre, email });
    
    // Verifica si la operacion fue exitosa
    if (resultado.status === 'success') {
        // Si fue exitosa, envía respuesta 201 (Created) con los datos del usuario creado
        res.status(201).json(resultado);
    } else {
        // Si fallo, envía respuesta 500 (Internal Server Error) con el mensaje de error
        res.status(500).json(resultado);
    }
}