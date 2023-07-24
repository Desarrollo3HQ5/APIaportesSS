import {add,all,delete_,one,query} from "../../DB/mysql.js" 
import { sucess, error } from '../../config/respuestas.js'
const OVController = {}

const tabla = "usuarios"


OVController.add_user= async(req,res) => {

    req.body.data.forEach(element => {
        const Estado= 0
        if (element.Estado == "ACTIVO") {
            Estado= 1
        }
        const nombre = element.Primer_Apellido + ' ' + element.Primer_Nombre
        const data = {
            "user":element.Numero_de_documento,
            "clave":element.Numero_de_documento,
            "token":element.ID,
            "estado":Estado,
            "tipo_usuario":3,
            "id_usuario":1,
            "persona":nombre,
            "cargo":element.Cargo_contratado,
            "telefono":element.Celular,
            "codigoReferencia":element.Nomina,
            "codigoEmpresa":element.EST,
        }
    });
    try{
        // console.log(req.body.user)
        // const items = await one(tabla,"1106308650");
        const items = await add(tabla,data);
        // console.log(items)
        sucess(req,res,items,200);
    }
    catch(err){
        next(err)
    }

}

export {OVController}