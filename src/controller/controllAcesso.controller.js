import { AccesToken,postAPI} from "../config/Urls.js";

const ControlAccesoController = {}

ControlAccesoController.getEmployee = (req, res) => {
    //TOKEN
    console.log("entradno")
    AccesToken().then(
        (response)=>{
            const url = "https://marketplacepruebas.aportesenlinea.com/Transversales.Servicios.Fachada/api/Persona/ConsultarPersonaEnBaseDatosReferencia";
            const data= req.body
            const headers= {
                "Content-Type":"application/json",
                "Anon":"Mareigua.Fanaia",
                "Token":response.data
            // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            console.log(headers)
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
            var tDate = req.body.Fechainicial
            var tDate2 = req.body.FechaFinal
            var date = new Date(tDate);
            var unixTimeStamp1 = Math. floor(date. getTime() / 1000);
            var date2 = new Date(tDate2);
            var unixTimeStamp2 = Math. floor(date2. getTime() / 1000);
            const data = req.body
            // {
            //     "certificadoAportes":{
            //         "TipoIdentificacionEmpleado":req.body.TipoDoc,
            //         "NumeroIdentificacionEmpleado":req.body.Doc,
            //         "PeriodoDesde": unixTimeStamp1,
            //         "PeriodoHasta": unixTimeStamp2,
            //         "FormatoReporte": 1,
            //         "LlaveApertura": "eb50-43ba-96f2f2"
            //     }
            // }
            const headers= {
                "Content-Type":"application/json",
                "Anon":"Mareigua.Fanaia",
                "Token":response.data
            // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            console.log(headers);
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
ControlAccesoController.postValidacionCargue = (req, res) => {
    //TOKEN
    AccesToken().then(
        (response)=>{
            const url = "https://marketplacepruebas.aportesenlinea.com/Fanaia.Servicios.Fachada/api/TransmisorPlanillaIntegrada/recepcionSolicitudPlanillaIntegrada";
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
ControlAccesoController.getResultValidacionCargue = (req, res) => {
    //TOKEN
    AccesToken().then(
        (response)=>{
            const url = "https://marketplacepruebas.aportesenlinea.com/Fanaia.Servicios.Fachada/api/TransmisorPlanillaIntegrada/recepcionSolicitudPlanillaIntegradahttps://marketplacepruebas.aportesenlinea.com/Fanaia.Servicios.Fachada/api/TransmisorPlanillaIntegrada/consultarEstadoSolicitud";
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
export {ControlAccesoController}