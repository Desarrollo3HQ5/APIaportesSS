import { chequearToken } from "../../../autenticacion/index.js";
import {query2,one2} from "../../../DB/mysql.js" 
function middleware(req, res , next){
    chequearToken.confirmar(req)
    validacionPermiso(req,next)
}

async function validacionPermiso(req,next){
try{

    const data = await one2("role_permissions", {rol_id:req.user.rol});
   // Usar Promise.all para esperar a que todas las consultas a la base de datos se completen
    const permissionsPromises = data.map(async (element) => {
        const permisos = await query2("permission", { permissions_id: element.permissions_id });
        return permisos;
    });
    
    const permissions = await Promise.all(permissionsPromises);
    // Verificar si el usuario tiene acceso
    let validador = false;
    permissions.forEach((permiso) => {
        if (permiso.url === req.url || req.user.rol === 1) {
        validador = true;
        }
    });
    if (!validador) {
        throw new Error('Permiso denegado , usuario no cuenta con permisos para esta acción')
    }
    next()
}
catch(error){
    next(error)
}
}


export {middleware,validacionPermiso}