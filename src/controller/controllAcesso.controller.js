import { AccesToken,postAPI} from "../config/Urls.js";
import {dirname, join} from "path"
import { fileURLToPath } from "url"
const ControlAccesoController = {}

// const spawn = require("child_process").spawn;
import { spawn } from "child_process";
// const Spawn = spawn();
var respuestaPython_ = "";
const __dirname = dirname(fileURLToPath(import.meta.url))

ControlAccesoController.getEmployee = (req, res) => {
    //TOKEN
    console.log("entradno")
    AccesToken().then(
        (response)=>{
            const url = "https://marketplacepruebas.aportesenlinea.com/Transversales.Servicios.Fachada/api/Persona/ConsultarPersonaEnBaseDatosReferencia";
            const data = {
                "data":[{
                "TipoDocumento":req.body.TipoDocumento,
                "NumeroDocumento":req.body.NumeroDocumento
            }]
        }
            const headers= {
                "Content-Type":"application/json",
                "Anon":"Mareigua.Fanaia",
                "Token":response.data
            // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            console.log(headers)
            console.log(data)
            postAPI(url,data,headers).then( (response) => {
                console.log(response)
                res.json(response)
                //Usage example:
                // let decodificado = atob(response.Reporte);
                // res.json(decodificado)
                // console.log(decodificado);
            })
        }
    )
}
ControlAccesoController.getEmployees = (req, res) => {
    //TOKEN
    AccesToken().then(
        (response)=>{
            const url = "https://marketplacepruebas.aportesenlinea.com/Transversales.Servicios.Fachada/api/Persona/ConsultarPersonaEnBaseDatosReferenciaMasivo";
            const data = {
                "data":req.body
        }
        console.log(data)
            const headers= {
                "Content-Type":"application/json",
                "Anon":"Mareigua.Fanaia",
                "Token":response.data
            // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            postAPI(url,data,headers).then( (response) => {
                res.json(response)
                //Usage example:
                // let decodificado = atob(response.Reporte);
                // res.json(decodificado)
                // console.log(decodificado);
            })
        }

    )
}
ControlAccesoController.getResultEmployees = (req, res) => {
    //TOKEN
    AccesToken().then(
        (response)=>{
            const url = "https://marketplacepruebas.aportesenlinea.com/Transversales.Servicios.Fachada/api/Persona/ConsultarRespuestaSolicitudPersonaMasivo";
            const data= req.body
            const headers= {
                "Content-Type":"application/json",
                "Anon":"Mareigua.Fanaia",
                "Token":response.data
            // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            postAPI(url,data,headers).then( (response) => {
                res.json(response)
                //Usage example:
                // let decodificado = atob(response.Reporte);
                // res.json(decodificado)
                // console.log(decodificado);
            })
        }

    )
}
ControlAccesoController.getCertificado = (req, res) => {
    //TOKEN
    AccesToken().then(
        (response)=>{
            const url = "https://aplicacionespruebas.aportesenlinea.com/Reportes.ServicioWeb/Reportes.svc/CertificadoAportes";
            const data = 
            {
                "certificadoAportes":{
                    "TipoIdentificacionEmpleado":req.body.TipoIdentificacionEmpleado,
                    "NumeroIdentificacionEmpleado":req.body.NumeroIdentificacionEmpleado,
                    "PeriodoDesde": req.body.PeriodoDesde,
                    "PeriodoHasta": req.body.PeriodoHasta,
                    "FormatoReporte": req.body.FormatoReporte,
                    "LlaveApertura": req.body.LlaveApertura
                }
            }
            const headers= {
                "Content-Type":"application/json",
                "Anon":"Mareigua.Fanaia",
                "Token":response.data
            // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            console.log(headers)
            console.log(data)
            postAPI(url,data,headers).then( (response) => {
                console.log(response)
                res.json(response)
                //Usage example:
                // let decodificado = atob(response.Reporte);
                // res.json(decodificado)
                // console.log(decodificado);
            })
        }
    )
}
ControlAccesoController.postValidacionCargue = (req, res) => {
    //TOKEN
    AccesToken().then(
        (response)=>{
            const url = "https://marketplacepruebas.aportesenlinea.com/Fanaia.Servicios.Fachada/api/TransmisorPlanillaIntegrada/recepcionSolicitudPlanillaIntegrada";
            const data={
                "data":[{
                    "IndicadorLiquidacion": req.body.IndicadorLiquidacion,
                    "TipoIDAportante": req.body.TipoIDAportante,
                    "NumeroIDAportante": req.body.NumeroIDAportante,
                    "CodigoSucursalPrincipal": req.body.CodigoSucursalPrincipal,
                    "TipoRegistro": req.body.TipoRegistro,
                    "TipoArchivo": req.body.TipoArchivo,
                    "Archivo": req.body.Archivo,
                    "EstructuraArchivo": req.body.EstructuraArchivo,
                    "IndicadorNotificacion": req.body.IndicadorNotificacion
                    }]
            } 
                
            const headers= {
                "Content-Type":"application/json",
                "Anon":"Mareigua.Fanaia",
                "Token":response.data
            // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            postAPI(url,data,headers).then( (response) => {
                res.json(response)
                //Usage example:
                // let decodificado = atob(response.Reporte);
                // res.json(decodificado)
                // console.log(decodificado);
            })
        }

    )
}
ControlAccesoController.getResultValidacionCargue = (req, res) => {
    //TOKEN
    AccesToken().then(
        (response)=>{
            const url = "https://marketplacepruebas.aportesenlinea.com/Fanaia.Servicios.Fachada/api/TransmisorPlanillaIntegrada/consultarEstadoSolicitud";
            const data= {"data":[{
                "IDTransaccion":req.body.IDTransaccion
                }]
            }
            const headers= {
                "Content-Type":"application/json",
                "Anon":"Mareigua.Fanaia",
                "Token":response.data
            // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            console.log(headers)
            console.log(data)
            postAPI(url,data,headers).then( (response) => {
                res.json(response)
                //Usage example:
                // let decodificado = atob(response.Reporte);
                // res.json(decodificado)
                // console.log(decodificado);
            })
        }

    )
}

//Servicio para comprobantes contables
ControlAccesoController.postComprobante = (req, res)=>{
    let data_1 = req.body.tipo_periodo;
    let data_2 = req.body.mes;
    let data_3 = req.body.anio;
    let data_4 = req.body.temporal;
    console.log(req.body)
    console.log( process.env.PATH );
    // const process = spawn('python',[join(__dirname,'../python/Comprobantes.py'),data_1,data_2,data_3,data_4]);
    // const process = spawn('python',["-u",join(__dirname, '../python/Comprobantes.py'),data_1,data_2,data_3,data_4]);
    const process = spawn('python',['./src/python/Comprobantes.py',data_1,data_2,data_3,data_4],{shell: true});
    
    process.stderr.on("data",(data)=>{
        console.error('stderr:',data.toString());
    })
    process.stdout.on('data', (data) => {
        respuestaPython_ = data.toString()
        if ( respuestaPython_ == "No existe registro"){
            return res.json({process: '0',result: 'No hay registros'});
        }
        else{
            return res.json({process: '0', result: respuestaPython_})
        }
        
        // Nombre_txt = data.toString();
        // Nombre_txt = Nombre_txt.split("\r\n").join("");
        // Nombre_txt = Nombre_txt.split("\n").join("");
        // if(Nombre_txt == "No existe registro"){res.json({process: '0', result: 'No hay Reporte TXTSS'});}
        // else{process.stdout.on('end', function(data) {res.json({process: '1', result: Nombre_txt});})}
    });

}
export {ControlAccesoController}