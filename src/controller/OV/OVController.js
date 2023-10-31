import { json } from "express"
import {add,all,delete_,one,query} from "../../DB/mysql.js" 
import { sucess, error } from '../../config/respuestas.js'
const OVController = {}

const tabla = "usuarios"

///OFICINA VIRTUAL
OVController.add_user= async(req,res,next) => {
    const datos_ = JSON.parse(req.body.data) 
    var ids_ = []
    for (let index = 0; index < datos_.length; index++) {
        const element = datos_[index];
        var Estado= 0
        if (element.Estado == "ACTIVO") {
            Estado= 1
        }
        var nombre = element.Primer_Apellido + ' ' + element.Primer_Nombre
        const data = {
            "user":element.Numero_de_documento,
            "clave":element.Numero_de_documento,
            "token":element.ID,
            "estado":Estado,
            "tipo_usuario":3,
            "usuario_creacion":1,
        }
        try{
            const items = await add(tabla,data);
            const idinsert =  items.insertId
            const data1 = {
                "id_usuario":idinsert,
                "nombres":element.Dependencia,
                "telefono":element.Celular,
                "persona":nombre,
                "cargo":element.Cargo_contratado,
                "codigoEmpresaZoho":element.Nomina,
                "idEmpresaZoho":element.EST,
                "documento":element.Numero_de_documento,
            }

            const items1 = await add("usuario_info",data1);
            ids_.push(items1.insertId.toString())
        }
        catch(err){
            next(err)
            // error(req,res,err,500);
        }
    };
    sucess(req,res,ids_.toString(),200);

}
export {OVController}