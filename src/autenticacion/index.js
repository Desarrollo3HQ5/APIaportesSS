import JsonWeb  from "jsonwebtoken";
const jwt_ =JsonWeb
import { jwt } from "../config/config.js";

const secret = jwt.secret;

function asignarToken(data){
    return jwt_.sign(data,secret, { expiresIn: 60*60*0.5});
}

function verificarToken(token){
    return jwt_.verify(token,secret)
}

const chequearToken = {
     confirmar: function(req){
        const decodificado = decodificarCabecera(req);
        return decodificado;
     }
}

function obtenerToken(autorizacion){
    // try
    // {
        if (!autorizacion) {
            throw new Error('no viene token');
        }
        let token = autorizacion.replace('Bearer ','')
        return token;
    // }
    // catch(Error){
    //     next(Error)
    // }
}


function decodificarCabecera(req){

    const autorizacion = req.headers.authorization || '';
    const token = obtenerToken(autorizacion);
    const decodificado = verificarToken(token);

    req.user = decodificado;

    return decodificado;
}
export { asignarToken,chequearToken}