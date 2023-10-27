import { Router } from "express";
const router = Router();
//middleware
import { middleware } from '../controller/ApiManage/seguridad/index.js'
//Controladores
import { CrediJobController } from '../controller/crediJob/credijob.controller.js'
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization")
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
    next();
  });
//Rutas
router.post("/api/v1/getEmployee",middleware,CrediJobController.getEmployee);
router.post("/api/v1/addnovedadCredijob",middleware,CrediJobController.addNovedades);
router.post("/api/v1/getnovedadCredijob",middleware,CrediJobController.getNovedades);

export default router;