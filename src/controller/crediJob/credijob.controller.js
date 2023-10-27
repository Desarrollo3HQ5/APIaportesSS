import {add,all,delete_,one,query,add2,all2,query2,getOneOrder} from "../../DB/mysql.js" 
import { sucess, error } from '../../config/respuestas.js'
//Registro de logs
import { createLog } from "../../config/logs.js";

//Importaciones necesarioas
import { hash, compare } from "bcrypt";

const CrediJobController = {}

CrediJobController.getEmployee= async(req,res,next) => {
  try{
    //Realizar peticion en zoho creator para el accestoken con el refresh token
    const accesToken = await validaraccesTokenZoho()
    const documento_ = req.body.data.documento;
    if (documento_ != null) {
      // console.log(accesToken.access_token)
      //Peticion para obtener empleados de la vista de empleados
      const url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/report/Informacion_empleado_Credijob?Numero_de_Documento=" + documento_
      const header = {"Authorization":"Zoho-oauthtoken "+accesToken.access_token , "Access-Control-Allow-Origin": "*"} 
      const empleado = await getAPI(url_,header)
      if (empleado.code == 3000) {
          sucess(req,res,empleado.data,200);
      }else{
        // throw new Error("Empleado no se encuentra activo en el sistema")
        throw new Error(error(req,res,'Empleado no se encuentra activo en el sistema',500))
      }
    }
    else{
      // throw new Error("No existe documento para consultar")
      throw new Error(error(req,res,'No existe documento para consultar',500))
    }

  }
  catch(error){
    next(error)
  }
}
CrediJobController.addNovedades= async(req,res,next) => {
  try{
    //Realizar peticion en zoho creator para el accestoken con el refresh token
    const accesToken = await validaraccesTokenZoho()
    const data = req.body
    if (data != null) {
      // console.log(accesToken.access_token)
      //Peticion para obtener empleados de la vista de empleados
      const url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/form/Novedades_credijob"
      const header = {"Authorization":"Zoho-oauthtoken "+accesToken.access_token , "Access-Control-Allow-Origin": "*"} 
      const novedad = await postAPI(url_,data,header)
      if (novedad.code == 3000) {
          sucess(req,res,novedad.data,200);
      }else{
        // sucess(req,res,"Error agregando al información",500);
        throw new Error(novedad)
      }
    }
    else{
      throw new Error("No existe informacion para ingresar")
    }

  }
  catch(error){
    next(error)
  }
}
CrediJobController.getNovedades= async(req,res,next) => {
  try{
    //Realizar peticion en zoho creator para el accestoken con el refresh token
    const accesToken = await validaraccesTokenZoho()
    const data = req.body.data.ID
    if (data != null) {

      // console.log(accesToken.access_token)
      //Peticion para obtener empleados de la vista de empleados
      const url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/report/Novedades_credijob_Report/"+ data
      const header = {"Authorization":"Zoho-oauthtoken "+accesToken.access_token , "Access-Control-Allow-Origin": "*"} 
      const novedad = await getAPI(url_,header)
      if (novedad.code == 3000) {
          sucess(req,res,novedad.data,200);
      }else{
        
        throw new Error(error(req,res,"Error con la información suminsitrada",500))
      }
    }
    else{
      throw new Error(error(req,res,"No existe informacion para ingresar",500))
    }

  }
  catch(error){
    next(error)
  }
}
async function validaraccesTokenZoho() {
    var user = {
      "usuario":"desarrollo3@hq5.com.co",
  }
  // try{
      const data = await query2("refreshToken_zoho", user);
      //Se obtiene el refresh token para zoho.
      let refresh_ = data.refresh
      let token = ""
      try{
        //Valdiar el accestoken si existe en la base de datos
        token = await getOneOrder("tokens","access_token,expired_at","id",{refresh_token_id:data.id});
        const inicio_ =  new Date().getTime(); 
        if (token.expired_at < inicio_) {
          token = await accesTokenZoho(refresh_,data.id)
        }
        return token
      }
      catch(err){
        const response = await accesTokenZoho(refresh_,data.id)
        return response
      }
  // }
  // catch(err){
  //     next(err)
  // }
    

}  
async function accesTokenZoho(refresh_,id){
  const url = 'https://accounts.zoho.com/oauth/v2/token?refresh_token=' + refresh_ + '&client_id=1000.1X8CFKQHNVMIQYBM2LD5D630UAMMXB&client_secret=ed77d9ad812478a75cb46e11db1bbc262b8f1d49bf&grant_type=refresh_token'
  const response = await postAPI(url,{"answer": "42" },{"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"})
  //construir objeto para insertar
  const inicio_ =  new Date().getTime(); 
  const milisengundos = response.expires_in * 1000;
  const end_ =  inicio_ + milisengundos; 
  const token ={
    access_token:response.access_token,
    api_domain:response.api_domain,
    token_type:response.token_type,
    expires_in:response.expires_in,
    created_at:inicio_,
    expired_at:end_,
    refresh_token_id:id
  }
  //Insertar en BD
  await add2("tokens",token);
  return response
}
async function postAPI(url = "", data = {},header = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers:header,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    // return response.json(); // parses JSON response into native JavaScript objects
    return response.json(); // parses JSON response into native JavaScript objects
  }
  async function getAPI(url = "",header = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers:header,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    // return response.json(); // parses JSON response into native JavaScript objects
    return response.json(); // parses JSON response into native JavaScript objects
  }
export {CrediJobController}