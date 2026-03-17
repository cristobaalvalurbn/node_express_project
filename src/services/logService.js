
// IMPORTACION DE MODULOS NATIVOS DE NODE.JS

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// CONFIGURACION DE RUTAS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construye la ruta absoluta al archivo log.txt dentro de src/data/
const rutaArchivoLog = path.join(__dirname, "..", "data", "log.txt");

//Registrar una visita
export function registrarVisita(ruta) {
    try {
        // Obtener el directorio donde debe estar el log (src/data/)
        const directorioLog = path.dirname(rutaArchivoLog);
        
        // Verificar si el directorio existe, si no, crearlo
        if (!fs.existsSync(directorioLog)) {
            fs.mkdirSync(directorioLog, { recursive: true });
        }
        
        const ahora = new Date();
        const fecha = ahora.toLocaleDateString();
        const hora = ahora.toLocaleTimeString();
        
        const entradaLog = "[" + fecha + " " + hora + "] Ruta accedida: " + ruta + "\n";
        
        // appendFileSync agrega la linea al final del archivo (lo crea si no existe)
        fs.appendFileSync(rutaArchivoLog, entradaLog, "utf8");
        
    } catch (error) {
        console.log("Error al registrar el log:", error.message);
    }
}

// Leer los logs (opcional, para debugging)

export function leerLogs() {
    try {
        const data = fs.readFileSync(rutaArchivoLog, "utf8");
        return data;
    } catch (error) {
        console.log("Error al leer los logs:", error.message);
        return "";
    }
}