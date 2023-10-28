import Mysql from "mysql2"
// import {mysqlDB,mysqlDB2} from "../config/config.js"
import {mysqlDB2} from "../config/config.js"

// const dbConfig = {
//     host:mysqlDB.host,
//     user: mysqlDB.user,
//     password : mysqlDB.password,
//     database : mysqlDB.database
// }
const dbConfig2 = {
    host:mysqlDB2.host,
    user: mysqlDB2.user,
    password : mysqlDB2.password,
    database : mysqlDB2.database
}
let conexion;
let conexion_2;
// function conMysql(){
//     conexion = Mysql.createConnection(dbConfig)
//     conexion.connect((err) =>{
//         if(err){
//             console.log('[db err]',err);
//             setTimeout(conMysql,200);
//         }else{
//             console.log("DB Conectada")
//         }
//     } );

//     conexion.on('error',err => {
//         console.log('[db err]',err);
//         if (err.code === 'PROTOCOL_CONNECTION_ERROR_LOST') {
//             conMysql();
//         }else{
//             throw err;
//         }
//     })
// }
function conMysql2(){
    conexion_2 = Mysql.createConnection(dbConfig2)
    conexion_2.connect((err) =>{
        if(err){
            console.log('[db err]',err);
            setTimeout(conMysql,200);
        }else{
            console.log("DB_2 Conectada")
        }
    } );

    conexion_2.on('error',err => {
        console.log('[db err]',err);
        if (err.code === 'PROTOCOL_CONNECTION_ERROR_LOST') {
            conMysql();
        }else{
            throw err;
        }
    })
}

// conMysql();
conMysql2();
//Consultas para base de datos 1
// function all(tabla){
//     return new Promise((resolve, reject)=>{
//         conexion.query(`SELECT * FROM ${tabla}`,(error, result) => {
//             return error ? reject(error):resolve(result)
//         })
//     })
// }
// function one(tabla,id){
//     return new Promise((resolve, reject)=>{
//         conexion.query(`SELECT * FROM ${tabla} WHERE token= ${id}`,(error, result) => {
//             // console.log(error)
//             // console.log(result)
//             return error ? reject(error):resolve(result)
//         })
//     })
// }
// //Funcion para insertar datos
// function add(tabla,data){
//     return new Promise((resolve, reject)=>{
//         conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,[data,data] ,(error, result) => {
//             // console.log(error)
//             // console.log(result)
//             return error ? reject(error):resolve(result)
//         })
//     })
// }
// //Funcion para insertar datos
// function query(tabla,consulta){
//     return new Promise((resolve, reject)=>{
//         conexion.query(`SELECT * FROM ${tabla} WHERE ?`,consulta ,(error, result) => {
//             return error ? reject(error):resolve(result[0])
//         })
//     })
// }
// function delete_(tabla,id){
// }
//Consulta para bases de datos 2
function delete2_(tabla,condicion){
    return new Promise((resolve, reject)=>{
        conexion_2.query(`DELETE FROM ${tabla} WHERE ?`,condicion,(error, result) => {
            return error ? reject(error):resolve(result)
        })
    })
}
function all2(tabla){
    return new Promise((resolve, reject)=>{
        conexion_2.query(`SELECT * FROM ${tabla}`,(error, result) => {
            return error ? reject(error):resolve(result)
        })
    })
}
function one2(tabla,datos){
    return new Promise((resolve, reject)=>{
        conexion_2.query(`SELECT * FROM ${tabla} WHERE ?`,datos,(error, result) => {
            // console.log(error)
            // console.log(result)
            return error ? reject(error):resolve(result)
        })
    })
}
//Funcion para insertar datos
function add2(tabla,data){
    return new Promise((resolve, reject)=>{
        conexion_2.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,[data,data] ,(error, result) => {
            // console.log(error)
            // console.log(result)
            return error ? reject(error):resolve(result)
        })
    })
}
//Funcion para insertar datos
function query2(tabla,consulta){
    return new Promise((resolve, reject)=>{
        conexion_2.query(`SELECT * FROM ${tabla} WHERE ?`,consulta ,(error, result) => {
            return error ? reject(error):resolve(result[0])
        })
    })
}
//Funcion para insertar datos
function update2(tabla,id,data){
    return new Promise((resolve, reject)=>{
        conexion_2.query(`UPDATE ${tabla} SET ? WHERE ?`,[data,id],(error, result) => {
            return error ? reject(error):resolve(result[0])
        })
    })
}
//Funcion para obtener datos con mas condiciones
function getOneOrder(tabla,select,order,condicion){
    return new Promise((resolve, reject)=>{
        conexion_2.query(`SELECT ${select} FROM ${tabla} WHERE ? ORDER BY ${order} DESC LIMIT 1`,condicion,(error, result) => {
            return error ? reject(error):resolve(result[0])
        })
    })
}

// export {all,one,add,delete_,query,all2,one2,add2,query2,update2,delete2_,getOneOrder}
export {all2,one2,add2,query2,update2,delete2_,getOneOrder}