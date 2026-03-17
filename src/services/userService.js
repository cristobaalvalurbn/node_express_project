
// IMPORTACION DE MODULOS DE NODE.JS

// Importa el modulo 'fs' para operaciones de archivos
import fs from "fs";

// Importa el modulo 'path' para construir rutas de archivo
import path from "path";

// Importa fileURLToPath para reconstruir __dirname en ES Modules
import { fileURLToPath } from "url";

// CONFIGURACION DE RUTAS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaArchivo = path.join(__dirname, "..", "data", "users.json");


//Leer usuarios desde JSON
// Exporta una funcion que lee el archivo JSON y devuelve un array de usuarios
export function leerUsuarios() {
    try {
        // readFileSync lee el archivo completo y devuelve su contenido como string
        const data = fs.readFileSync(rutaArchivo, "utf8");
        // JSON.parse convierte el string JSON a un objeto JavaScript (array de usuarios)
        return JSON.parse(data);
        // Si el archivo no existe o tiene formato invalido, captura el error
    } catch (error) {
        console.log(`Error al leer usuarios: ${error.message}`);
        // Devuelve array vacio para que la aplicacion continue sin fallar
        return [];
    }
}

// FUNCION: Guardar usuarios en JSON
// Exporta una funcion que recibe un array de usuarios y lo escribe en el archivo JSON
export function guardarUsuarios(usuarios) {
    try {
        // writeFileSync escribe el archivo:
        // JSON.stringify convierte el array a string JSON
        // "utf8" especifica la codificacion de texto
        fs.writeFileSync(rutaArchivo, JSON.stringify(usuarios, null, 2), "utf8");
        // Confirma en consola que la operacion fue exitosa
        console.log("Archivo de usuarios actualizado correctamente");
        // Si hay error de escritura (ej: permisos), lo captura y muestra
    } catch (error) {
        console.log(`Error al guardar usuarios: ${error.message}`);
    }
}


// FUNCION: Obtener todos los usuarios (formato API)

// Exporta una funcion que devuelve todos los usuarios con estructura de respuesta API
export function obtenerTodosLosUsuarios() {
    try {
        // Llama a leerUsuarios para obtener el array desde el archivo
        const usuarios = leerUsuarios();
        // Devuelve objeto con status 'success' y los datos de usuarios
        return {
            status: "success",
            data: usuarios
        };
        // Si ocurre error en la lectura, lo captura
    } catch (error) {
        // Devuelve objeto con status 'error' y el mensaje del error
        return {
            status: "error",
            message: error.message
        };
    }
}


// Buscar usuario por 
// Exporta una funcion que busca y devuelve un usuario especifico por su ID
// Si no lo encuentra, lanza un error para que el controlador lo maneje
export function buscarUsuarioPorId(id) {
    // Lee todos los usuarios desde el archivo
    const usuarios = leerUsuarios();
    
    // find() recorre el array y devuelve el primer elemento que cumpla la condicion
    // parseInt(id) asegura que comparamos numeros con numeros (el ID viene como string de la URL)
    const usuario = usuarios.find((u) => u.id === parseInt(id));
    
    // Si no se encontro ningun usuario con ese ID
    if (!usuario) {
        // Lanza un error con mensaje descriptivo para que sea capturado por el controlador
        throw new Error(`No se encontro un usuario con el ID ${id}`);
    }
    
    // Si se encontro, devuelve objeto con status 'success' y los datos del usuario
    return {
        status: "success",
        data: usuario
    };
}

//Agregar nuevo usuario
// Exporta una funcion que recibe datos de un nuevo usuario y lo agrega al archivo
export function agregarUsuario(nuevoUsuario) {
    try {
        // Lee el array actual de usuarios desde el archivo
        const usuarios = leerUsuarios();
        
        // Calcula el ultimo ID existente:
        // map(u => u.id) extrae todos los IDs, Math.max() encuentra el mayor
        // Si el array esta vacio, usa 0 como valor por defecto
        const ultimoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) : 0;
        
        // Crea el objeto del nuevo usuario con:
        // id: ultimoId + 1 (autoincremental)
        // nombre y email: tomados del parametro recibido
        const usuarioConId = {
            id: ultimoId + 1,
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email
        };
        
        // Agrega el nuevo usuario al final del array
        usuarios.push(usuarioConId);
        
        // Guarda el array actualizado en el archivo JSON
        guardarUsuarios(usuarios);
        
        // Devuelve respuesta de exito con el usuario creado
        return {
            status: "success",
            message: "Usuario creado correctamente",
            data: usuarioConId
        };
        // Si ocurre algun error en el proceso, lo captura
    } catch (error) {
        // Devuelve respuesta de error con el mensaje correspondiente
        return {
            status: "error",
            message: error.message
        };
    }
}

//Eliminar usuario por ID
// Exporta una funcion que elimina un usuario del archivo por su ID
export function eliminarUsuario(id) {
    try {
        // Lee el array actual de usuarios
        const usuarios = leerUsuarios();
        
        // filter() crea un nuevo array excluyendo el usuario con el ID indicado
        // parseInt(id) asegura comparacion numerica correcta
        const usuariosActualizados = usuarios.filter((u) => u.id !== parseInt(id));
        
        // Compara longitudes: si son iguales, significa que no se elimino ningun elemento
        if (usuarios.length === usuariosActualizados.length) {
            // Lanza error indicando que no se encontro el usuario a eliminar
            throw new Error(`No se encontro un usuario con ID ${id} para eliminar`);
        }
        
        // Guarda el array actualizado (sin el usuario eliminado) en el archivo
        guardarUsuarios(usuariosActualizados);
        
        // Devuelve respuesta de exito confirmando la eliminacion
        return {
            status: "success",
            message: `Usuario con ID ${id} eliminado correctamente`
        };
        // Si ocurre error, lo captura
    } catch (error) {
        // Devuelve respuesta de error con el mensaje correspondiente
        return {
            status: "error",
            message: error.message
        };
    }
}

//Mostrar usuarios en consola (para debug al iniciar servidor)
// Exporta una funcion que imprime los usuarios cargados en la terminal
export function mostrarUsuariosEnConsola() {
    // Llama a leerUsuarios para obtener el array desde el archivo
    const usuarios = leerUsuarios();
    
    // Imprime una linea en blanco y separador visual de 50 caracteres '='
    console.log('\n' + '='.repeat(50));
    // Imprime el titulo de la seccion
    console.log('USUARIOS CARGADOS EN EL SISTEMA');
    // Imprime otro separador visual
    console.log('='.repeat(50));
    
    // Verifica si el array de usuarios esta vacio
    if (usuarios.length === 0) {
        // Si no hay usuarios, imprime mensaje informativo
        console.log('No hay usuarios registrados');
    } else {
        // Si hay usuarios, imprime el total usando template literals
        console.log(`Total: ${usuarios.length} usuario(s)\n`);
        // forEach recorre cada usuario y lo imprime con formato legible usando template literals
        usuarios.forEach((u) => {
            console.log(`  - ID: ${u.id} | Nombre: ${u.nombre} | Email: ${u.email}`);
        });
    }
    // Imprime separador final y linea en blanco
    console.log('='.repeat(50) + '\n');
}