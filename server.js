import express from "express"
import {dirname, join} from "path"
import { fileURLToPath } from "url"
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
//Middleware
import { errors } from "./src/config/errors.js";
dotenv.config()
//Enrutador
import indexRoutes from './src/routes/index.js'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
// app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//Usar el enrutador
app.use(indexRoutes)
app.use(errors)
//usar los archivos staticos
app.use(express.static(join(__dirname,'public')))


const PORT = process.env.PORT;
app.listen(PORT,() =>console.log("Servidor corriendio en puerto: " + PORT + " prueba en " + process.env.AMBIENTE) )
