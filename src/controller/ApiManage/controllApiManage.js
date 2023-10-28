import { json } from "express"
import {add2,all2,query2,update2, one2,delete2_} from "../../DB/mysql.js" 
import { sucess, error } from '../../config/respuestas.js'
//Registro de logs
import { createLog } from "../../config/logs.js";

//Importaciones necesarioas
import { hash, compare } from "bcrypt";

//Funciones
import { asignarToken } from "../../autenticacion/index.js";

const AMController = {}

const tabla = "user"

AMController.getUser= async(req,res,next) => {
    var user = {
        "username":req.body.data.username,
        "password":req.body.data.password
    }
    try{
        const token = await login(req,res,user)
        await createLog(user.username,"/auth/","GET","Usuario se logueado","Token")
        sucess(req,res,token,200);
    }
    catch(err){
        next(err)
        // throw new Error('Informacion invalida , usuario no activo')
    }
}

async function login(req,res,user){
    
    const data = await query2(tabla, {username:user.username});
    return (compare(user.password, data.password)
        .then(async resultado => {
            if (resultado === true) {
                await createLog(user.username,"/auth/","GET","Usuario se esta logueando","")
                //Generar token
                if (data.activo == 1) {
                    //Generar token
                    const token={
                        "token":asignarToken({...data}),
                        "expiresIn":1800
                    }
                    return token
                }
                else{
                    // error(req,res,"Informacion invalida , usuario no activo")
                    throw new Error(error(req,res,'Informacion invalida , usuario no activo',404))
                }
            }else{
                // error(req,res,"Informacion invalida , usuario o contraseña son invalidos")
                // res.status(500).json(error(req,res,"Informacion invalida , usuario o contraseña son invalidos",500));
                throw new Error(error(req,res,"Informacion invalida , usuario o contraseña son invalidos",404))
            }
        }))
}
//Admin
//Logs
AMController.getLogs = async(req,res,next) => {
    try{
        const logs = await all2("logs")
        // await createLog("Administrador",req.url,req.method,'Se obtienen todos los logs',JSON.stringify(logs))
        sucess(req,res,logs,200);
    }
    catch(err){
        next(err)
    }
}
//Usuario
AMController.getAllUser = async(req,res,next) => {
    try{
        const users = await all2(tabla)
        await createLog("Administrador",req.url,req.method,'Se obtienen todos los usuarios',"Se obtienen todos los usuarios")
        sucess(req,res,users,200);
    }
    catch(err){
        next(err)
    }
}
AMController.addUser = async(req,res,next) => {
    try{
        const { username, email, password, create_time, rol, activo } = req.body;
        // Genera un salt para hashear la contraseña (mayor número de rondas es más seguro pero más lento)
        const saltRounds = 10;
        // Hashea la contraseña
        const hashedPassword = await hash(password, saltRounds);
        // Crea el objeto del usuario con la contraseña hasheada
        const user = {
        username,
        email,
        password: hashedPassword, // Asigna la contraseña hasheada
        create_time,
        rol,
        activo
        };
        const users = await add2(tabla,user)
        await createLog("Administrador",req.url,req.method,'Se agrega un usuario con información ' + user,"Usuario creado")
        sucess(req,res,users,200);
    }
    catch(err){
        next(err)
    }
}
AMController.editUser = async(req,res,next) => {
    try{
        const { username, email, password, create_time, rol, activo } = req.body;
        // Genera un salt para hashear la contraseña (mayor número de rondas es más seguro pero más lento)
        
        if (password != "") {
            console.log("Aqui")
            const saltRounds = 10;
            // Hashea la contraseña
            const hashedPassword = await hash(password, saltRounds);
            // Crea el objeto del usuario con la contraseña hasheada
            const user = {
                username,
                email,
                password: hashedPassword, // Asigna la contraseña hasheada
                rol,
                activo
                };
                const update = await update2(tabla,{username:username},user)
                await createLog("Administrador",req.url,req.method,'Se modifica un usuario con información ' + user,"Usuario modificado")
                sucess(req,res,update,200);
        }else{
            const user = {
                username,
                email,
                rol,
                activo
                };
                const update = await update2(tabla,{username:username},user)
                await createLog("Administrador",req.url,req.method,'Se modifica un usuario con información ' + user,"Usuario modificado")
                sucess(req,res,update,200);
        }
        
        
    }
    catch(err){
        next(err)
    }
}
AMController.deleteUser = async(req,res,next) => {
    try{
        const users = await delete2_(tabla,{username:req.body.username})
        sucess(req,res,users,200);
    }
    catch(err){
        next(err)
    }
}
//Rol
AMController.getAllRols = async(req,res,next) => {
    try{
        const rol = await all2("Rol")
        for (let contador = 0; contador < rol.length; contador++) {
        const element = rol[contador];
        const roles_permisos = await one2("role_permissions", { rol_id: element.rol_id });
        // element.permisos = roles_permisos;
        element.permisos = roles_permisos.map((permiso) => ({ permissions_id: permiso.permissions_id }));
        }
        sucess(req,res,rol,200);
    }
    catch(err){
        next(err)
    }
}
AMController.addRol = async(req,res,next) => {
    try{
        const { rol_id, name, permissons } = req.body;
        const rol_ = {
            name,
            };
       
        var rol = await add2("Rol",rol_)
        permissons.forEach(async element => {
            const rol_permiss=
            {
                rol_id:rol.insertId,
                permissions_id:element
            }
            await add2("role_permissions",rol_permiss)
        });
        sucess(req,res,rol,200);
    }
    catch(err){
        next(err)
    }
}
AMController.editRol = async(req,res,next) => {
    try{
        const { rol_id, name, permisos } = req.body;
        const rol_ = {
            name,
            };
        //Editar rol
        const update = await update2("Rol",{rol_id:rol_id},rol_)
        if (permisos.length != 0) {
            await delete2_("role_permissions",{rol_id:rol_id})
            permisos.forEach(async element => {
                const rol_permiss=
                {
                    rol_id:rol_id,
                    permissions_id:element
                }
                await add2("role_permissions",rol_permiss)
            });
        };
        sucess(req,res,update,200);
    }
    catch(err){
        next(err)
    }
}
//Permisos
AMController.getAllPermissons = async(req,res,next) => {
    try{
        const permisos = await all2("permission")
        sucess(req,res,permisos,200);
    }
    catch(err){
        next(err)
    }
}
AMController.addPermiss = async(req,res,next) => {
    try{
        const permisos = await add2("permission",req.body)
        sucess(req,res,permisos,200);
    }
    catch(err){
        next(err)
    }
}
AMController.editPermiss = async(req,res,next) => {
    try{
        // Genera un salt para hashear la contraseña (mayor número de rondas es más seguro pero más lento)
        const update = await update2("permission",{permissions_id:req.body.permissions_id},req.body)
        sucess(req,res,update,200);
    }
    catch(err){
        next(err)
    }
}
//Roles permisos
AMController.getAllRol_permiss = async(req,res,next) => {
    try{
        const roles_permisos = await all2("role_permissions")
        sucess(req,res,roles_permisos,200);
    }
    catch(err){
        next(err)
    }
}
//Roles permisos
AMController.getOneRol_permiss = async(req,res,next) => {
    try{
        const roles_permisos = await one2("role_permissions",req.body)
        sucess(req,res,roles_permisos,200);
    }
    catch(err){
        next(err)
    }
}
AMController.addRol_permiss = async(req,res,next) => {
    try{
        const roles_permisos = await add2("role_permissions",req.body)
        sucess(req,res,roles_permisos,200);
    }
    catch(err){
        next(err)
    }
}
export {AMController}