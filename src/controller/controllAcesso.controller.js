import { AccesToken,postAPI} from "../config/Urls.js";

const ControlAccesoController = {}

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
export {ControlAccesoController}