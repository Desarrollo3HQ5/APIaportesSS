import { error } from "../config/respuestas.js";

function errors(err , req, res){
    // console.log('[Error]',err)

    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;

    error(req,res,message,status);
    

}

export {errors}