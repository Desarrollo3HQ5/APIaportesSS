import {add2} from "../DB/mysql.js"
// import { moment } from "moment";
import moment from "moment/moment.js";
async function createLog(usuario_id ,ruta,metodo,mensaje,respuesta){

    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const log = {
        timestamp:timestamp,
        usuario_id:usuario_id,
        ruta: ruta, // Asigna la contraseña hasheada
        metodo:metodo,
        mensaje:mensaje,
        respuesta:respuesta
        };

    await add2("logs",log)
 }
 export{createLog}