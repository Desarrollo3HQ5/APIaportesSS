import { json } from "express"
import {add,all,delete_,one,query} from "../../DB/mysql.js" 
import { sucess, error } from '../../config/respuestas.js'
const OVController = {}

const tabla = "usuarios"


OVController.add_user= async(req,res,next) => {
    // console.log(req.body)
    // const datos_ = JSON.stringify(req.body.data)
    const datos_ = JSON.parse(req.body.data[0]) 
    // const datos_  = req.body.data
    
    // const datos_  = JSON.parse(JSON.stringify(req.body.data))
    var ids_ = []
    console.log(datos_)
    for (let index = 0; index < datos_.length; index++) {
        const element = datos_[index];
        // console.log(element.Numero_de_documento)
        
    // }

    // datos_.forEach(async element => {
        console.log(element)
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
        try{
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
    };
    sucess(req,res,ids_.toString(),200);

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