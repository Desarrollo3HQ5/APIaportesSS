import { error } from "../config/respuestas.js";

function errors(err , req, res){
    // console.log('[Error]',err)

    // const message = err.message || 'Error interno';
    // const status = err.statusCode || 500;
    // error(req,res,message,status);
     // Verifica si err es un objeto de error y obtén su statusCode y message
     const statusCode = err.statusCode || 500;
     const message = err.message || 'Error interno';
 
     // Construye una respuesta JSON personalizada
     const errorResponse = {
         error: {
             code: "UNDER_MAINTENANCE",
             http_code: statusCode,
             message: message
         }
     };
 
     // Envía la respuesta JSON
     res.status(statusCode).json(errorResponse);
}

export {errors}