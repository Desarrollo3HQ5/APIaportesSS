import Mysql from "mysql2"
import {mysqlDB} from "../config/config.js"

const dbConfig = {
    host:mysqlDB.host,
    user: mysqlDB.user,
    password : mysqlDB.password,
    database : mysqlDB.database
}
let conexion;

function conMysql(){
    conexion = Mysql.createConnection(dbConfig)
    conexion.connect((err) =>{
        if(err){
            console.log('[db err]',err);
            setTimeout(conMysql,200);
        }else{
            console.log("DB Conectada")
        }
    } );

    conexion.on('error',err => {
        console.log('[db err]',err);
        if (err.code === 'PROTOCOL_CONNECTION_ERROR_LOST') {
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql();
function all(tabla){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla}`,(error, result) => {
            return error ? reject(error):resolve(result)
        })
    })
}
function one(tabla,id){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE user= ${id}`,(error, result) => {
            // console.log(error)
            // console.log(result)
            return error ? reject(error):resolve(result)
        })
    })

}

//Funcion para insertar datos
function add(tabla,data){
    return new Promise((resolve, reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,[data,data] ,(error, result) => {
            // console.log(error)
            // console.log(result)
            return error ? reject(error):resolve(result)
        })
    })
}
//Funcion para insertar datos
function query(tabla,consulta){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`,consulta ,(error, result) => {
            return error ? reject(error):resolve(result[0])
        })
    })
}
function delete_(tabla,id){
}

export {all,one,add,delete_,query}