import { Router } from "express";
const router = Router();
//Controladores
import { AMController } from '../controller/ApiManage/controllApiManage.js'

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
    next();
  });

//POST
//autenticación
router.post("/auth/", AMController.getUser);
//Administrador
//Logs
router.get("/admin/api/v1/getLogs",AMController.getLogs);
//Users
router.get("/admin/api/v1/getUsers",AMController.getAllUser);
router.post("/admin/api/v1/addUser",AMController.addUser);
router.put("/admin/api/v1/editUser",AMController.editUser);
router.post("/admin/api/v1/deleteUser",AMController.deleteUser);
//Rols
router.get("/admin/api/v1/getRols",AMController.getAllRols);
router.post("/admin/api/v1/addRol",AMController.addRol);
router.put("/admin/api/v1/editRol",AMController.editRol);
//Permiss
router.get("/admin/api/v1/getPermissons",AMController.getAllPermissons);
router.post("/admin/api/v1/addPermiss",AMController.addPermiss);
router.put("/admin/api/v1/editPermiss",AMController.editPermiss);
//Rol permiss
router.post("/admin/api/v1/getOneRolPermissons",AMController.getOneRol_permiss);
export default router;