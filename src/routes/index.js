import { Router } from "express";
const router = Router();

//Controladores
import { ControlAccesoController } from '../controller/controllAcesso.controller.js'
import { OVController } from '../controller/OV/OVController.js'
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
    next();
  });
//POST
//COnsulta empleados
router.post("/queryEmployee/", ControlAccesoController.getEmployee);
router.post("/queryEmployees/", ControlAccesoController.getEmployees);
router.post("/queryResultEmployees/", ControlAccesoController.getResultEmployees);
//Certificado de aportes
router.post("/querycertificate/", ControlAccesoController.getCertificado);
//Validacion y cargue
router.post("/validacionCargue/", ControlAccesoController.postValidacionCargue);
router.post("/queryResultvalidacionCargue/", ControlAccesoController.getResultValidacionCargue);

//Servicio para comprobantes contables
router.post("/comprobantesContablesNomina/", ControlAccesoController.postComprobante);
//API sin front externo, directo zoho
router.post('/api/v1/prenominaReporte', ControlAccesoController.reportePrenomina)
//API BD OV
router.post('/api/v1/addMisionales', OVController.add_user)

export default router;