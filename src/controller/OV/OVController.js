import { json } from "express"
import {add,all,delete_,one,query} from "../../DB/mysql.js" 
import { sucess, error } from '../../config/respuestas.js'
const OVController = {}

const tabla = "usuarios"


OVController.add_user= async(req,res,next) => {
    // console.log(req.body)
    // const datos_ = JSON.stringify(req.body.data)
    const datos_ = req.body.data
    var ids_ = []
    // console.log(datos_)
    datos_.forEach(async element => {
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
            "usuario_creacion":1,
        }
        
        // const usuario = await one(tabla,element.ID);
        // console.log(usuario)
        try{
            // console.log(data)
            // const items = await one(tabla,"1106308650");
            
            // if (usuario == ) {
                
            // }
            const items = await add(tabla,data);
            // console.log(items)
            const idinsert =  items.insertId
            // console.log(idinsert)
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
            // console.log(data1)
            const items1 = await add("usuario_info",data1);
            ids_.push(items1.insertId.toString())
            console.log(ids_)
        
        }
        catch(err){
            next(err)
            // error(req,res,err,500);
        }
    });
    

}

// const data = {
//     "user":element.Numero_de_documento,
//     "clave":element.Numero_de_documento,
//     "token":element.ID,
//     "estado":Estado,
//     "tipo_usuario":3,
//     "id_usuario":1,
//     "persona":nombre,
//     "cargo":element.Cargo_contratado,
//     "telefono":element.Celular,
//     "codigoReferencia":element.Nomina,
//     "codigoEmpresa":element.EST,
// }
export {OVController}