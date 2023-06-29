# importar librerias
import pandas as pd
from datetime import datetime
import math
import sys
import base64
from os import remove
import os
from shutil import rmtree
from xlsxwriter import Workbook
# from io import BytesIO
# import io,csv
# from openpyxl.utils.dataframe import dataframe_to_rows
# from openpyxl import Workbook
# from openpyxl import load_workbook
#Hilos
import threading
# API
import requests
import json
#Tiempo
import time
def procesar():
    global tipoPeriodo,mes,anio,temporal_,tiempo_,token,Consecutivo_,Id_
    tipoPeriodo = sys.argv[1]
    mes = sys.argv[2]
    anio= sys.argv[3]
    temporal_ = sys.argv[4]
    IdPeriodo = "38260"
    # tipoPeriodo = '3'
    # mes = '3'
    # anio= '2023'
    # IdPeriodo = "38541"
    # # IdPeriodo = "38260"
    # temporal_ = "HQ5 S.A.S"
    # temporal_ = "TEMPOENLACE S.A.S"
    temporal = temporal_.replace(" ","%20")
    
    tiempo_ = 0
    token = ""
    Token_ = AccesToken()
    # Realizar consulta
    url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/report/Consecutivo_cuentas_contables_Report?Temporal="+temporal
    header = {"Authorization":"Zoho-oauthtoken "+Token_ , "Access-Control-Allow-Origin": "*"} 
    r = requests.get(url_,headers=header)
    resp = r.json()
    print(resp)
    res = resp['data']
    Id_ = res[0]['ID']
    Consecutivo_ = res[0]['Consecutivo_nomina']
    Consecutivo_ = int(Consecutivo_)
    # print("Empieza")
    Estado_ = "[Enviada a Pago,Pagada,Enviada al banco]".replace(" ","%20")
    # URL = "https://creatorapp.zohopublic.com/hq5colombia/compensacionhq5/xls/Reporte_de_Nominas_Desarrollo/h4VODZKN6Hm1q98ZWsCKzbF37HkGZY4TRydyQ68UpzWa5Mk8OaXsWTU5qzWPYapydPSkUayjM74uq1gY7vYJVXMw6P9CQfNTm8g4?Temporal=" + temporal+"&ID_Periodo.Anio=" + anio + "&ID_Periodo.Anio_op=18&ID_Periodo.Mes="+ mes +"&ID_Periodo.Mes_op=18&ID_Periodo.Tipo_de_Perido="+ tipoPeriodo + "&ID_Periodo.Tipo_de_Perido_op=18"
    URL = "https://creatorapp.zohopublic.com/hq5colombia/compensacionhq5/xls/Reporte_de_Nominas_Desarrollo/h4VODZKN6Hm1q98ZWsCKzbF37HkGZY4TRydyQ68UpzWa5Mk8OaXsWTU5qzWPYapydPSkUayjM74uq1gY7vYJVXMw6P9CQfNTm8g4?Temporal=" + temporal+"&ID_Periodo.Anio=" + anio + "&ID_Periodo.Anio_op=18&ID_Periodo.Mes="+ mes +"&ID_Periodo.Mes_op=18&ID_Periodo.Tipo_de_Perido="+ tipoPeriodo + "&ID_Periodo.Tipo_de_Perido_op=18&Estado_Nomina="+ Estado_ + "&Pendiente_Comprobante_op=50"
    # URL = "https://creatorapp.zohopublic.com/hq5colombia/compensacionhq5/xls/Reporte_de_Nominas_Desarrollo/h4VODZKN6Hm1q98ZWsCKzbF37HkGZY4TRydyQ68UpzWa5Mk8OaXsWTU5qzWPYapydPSkUayjM74uq1gY7vYJVXMw6P9CQfNTm8g4?Temporal=" + temporal+"&ID_Periodo.Anio=" + anio + "&ID_Periodo.Anio_op=18&ID_Periodo.Mes="+ mes +"&ID_Periodo.Mes_op=18&ID_Periodo.Tipo_de_Perido="+ tipoPeriodo + "&ID_Periodo.Tipo_de_Perido_op=18&Estado_Nomina="+ Estado_ +"&ID_Periodo="+IdPeriodo
    df = pd.read_excel(URL)
    df1 = pd.DataFrame(df) 
    if(df1.empty):
        print("No existe registro")
    else:
        Periodo_  = df1['Id Periodo'].unique().tolist()
        # Division de la lista para periodos
        if(len(Periodo_) < 5):
            # Bloqueo para el consecutivo
            lock = threading.Lock()
            # Creacion de hilos
            hilo1 = threading.Thread(target=HilosPorDF(df1,tipoPeriodo,lock))
            # Iniciar hilos
            hilo1.start()
        else:
            
            Cantidad_ = len(Periodo_) / 8
            Cantidad_ = int(Cantidad_+1)
            # Seccionar los periodos y armar dataframes nuevos
            Valores1 = df1[df1['Id Periodo'].isin(Periodo_[0:Cantidad_])]
            Valores2 = df1[df1['Id Periodo'].isin(Periodo_[Cantidad_:Cantidad_*2])]
            Valores3 = df1[df1['Id Periodo'].isin(Periodo_[(Cantidad_)*2:Cantidad_*3])]
            Valores4 = df1[df1['Id Periodo'].isin(Periodo_[(Cantidad_*3):Cantidad_*4])]
            Valores5 = df1[df1['Id Periodo'].isin(Periodo_[(Cantidad_*4):Cantidad_*5])]
            Valores6 = df1[df1['Id Periodo'].isin(Periodo_[(Cantidad_*5):Cantidad_*6])]
            Valores7 = df1[df1['Id Periodo'].isin(Periodo_[(Cantidad_*6):Cantidad_*7])]
            Valores8 = df1[df1['Id Periodo'].isin(Periodo_[(Cantidad_*7):len(Periodo_)])]
            # Bloqueo para el consecutivo
            lock = threading.Lock()
            # Creacion de hilos
            hilo1 = threading.Thread(target=HilosPorDF(Valores1,tipoPeriodo,lock),name = "Hilo1")
            hilo2 = threading.Thread(target=HilosPorDF(Valores2,tipoPeriodo,lock),name = "Hilo2")
            hilo3 = threading.Thread(target=HilosPorDF(Valores3,tipoPeriodo,lock),name = "Hilo3")
            hilo4 = threading.Thread(target=HilosPorDF(Valores4,tipoPeriodo,lock),name = "Hilo4")
            hilo5 = threading.Thread(target=HilosPorDF(Valores5,tipoPeriodo,lock),name = "Hilo5")
            hilo6 = threading.Thread(target=HilosPorDF(Valores6,tipoPeriodo,lock),name = "Hilo6")
            hilo7 = threading.Thread(target=HilosPorDF(Valores7,tipoPeriodo,lock),name = "Hilo7")
            hilo8 = threading.Thread(target=HilosPorDF(Valores8,tipoPeriodo,lock),name = "Hilo8")
            # Iniciar hilos
            hilo1.start()
            hilo2.start()
            hilo3.start()
            hilo4.start()
            hilo5.start()
            hilo6.start()
            hilo7.start()
            hilo8.start()
        
        # Llamar API de zoho para actualizar datos del consecutivo
        Token_ = AccesToken()
        # Realizar consulta
        Datos_ = {"data": {"Consecutivo_nomina": Consecutivo_}}
        Datos_ = json.dumps(Datos_)
        url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/report/Consecutivo_cuentas_contables_Report/"+ str(Id_)
        header = {"Authorization":"Zoho-oauthtoken "+Token_, "Access-Control-Allow-Origin": "*"} 
        r = requests.put(url_,data=Datos_,headers=header)
        print("Completado")
def marcarNominas(Nominas,bloqueo):
    
    for nomina in Nominas:
        # Llamar API de zoho para actualizar datos del consecutivo
        # Token_ = AccesToken()
        Token_ = AccesTokenBloqueo(bloqueo)
        # Realizar consulta
        Datos_ = {"data": {"Pendiente_Comprobante": True}}
        Datos_ = json.dumps(Datos_)
        url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/report/Reporte_de_Nominas_Desarrollo/"+ nomina
        header = {"Authorization":"Zoho-oauthtoken "+Token_, "Access-Control-Allow-Origin": "*"} 
        r = requests.put(url_,data=Datos_,headers=header)
        
def actualizarConsecutivo(consecutivo,bloqueo):
    global Id_ , temporal
    # Token_ = AccesToken()
    Token_ = AccesTokenBloqueo(bloqueo)
    # Realizar consulta
    Datos_ = {"data": {"Consecutivo_nomina": consecutivo}}
    Datos_ = json.dumps(Datos_)
    url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/report/Consecutivo_cuentas_contables_Report/"+ Id_
    header = {"Authorization":"Zoho-oauthtoken "+Token_, "Access-Control-Allow-Origin": "*"} 
    r = requests.put(url_,data=Datos_,headers=header)
    
def IngresararchivoComprobante(IDPeriodo_,longitud,bloqueo):
    global tipoPeriodo,mes,anio,temporal_,Consecutivo_
    # Llamar API de zoho para actualizar datos del consecutivo
    # Token_ = AccesToken()
    Token_ = AccesTokenBloqueo(bloqueo)
    # Realizar consulta
    Datos_ = {"data": {"Anio":anio,"Mes":mes,"Tipo_de_periodo":tipoPeriodo,"Temporal":temporal_,"id_periodo":IDPeriodo_,"cantidad_nominas":longitud}}
    Datos_ = json.dumps(Datos_)
    url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/form/Archivos_Comprobantes_contables"
    header = {"Authorization":"Zoho-oauthtoken "+Token_, "Access-Control-Allow-Origin": "*"} 
    r = requests.post(url_,data=Datos_,headers=header)
    resp = r.json()
    res = resp['data']
    Id_ = res['ID']
    # Realizar consulta
    with open('Comprobante' + str(IDPeriodo_)+ '_' + str(Consecutivo_) +'.xlsx','rb') as archivo:
        Datos_ = {'file': archivo}
        url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/report/Archivos_Comprobantes_contables_Report/"+str(Id_)+"/Comprobante_contable/upload"
        header = {"Authorization":"Zoho-oauthtoken "+Token_, "Access-Control-Allow-Origin": "*"} 
        r = requests.post(url_,files=Datos_,headers=header)
    if(r.status_code == 200):
        time.sleep(5)
        os.remove('Comprobante' + str(IDPeriodo_)+ '_' + str(Consecutivo_) +'.xlsx')
    
    
def IngresarComprobantescontables(DataFrame):
    DataFrame['Identificación tercero']=""
    DataFrame.fillna(0, inplace=True)
    DataFrame.columns = ['Tipo_de_comprobante', 'Consecutivo_comprobante', 'Fecha_de_elaboraci_n1', 'Sigla_moneda', 'Tasa_de_cambio', 'C_digo_cuenta_contable_text','Identificaci_n_tercero',
                         'Sucursal','C_digo_producto','C_digo_de_bodega','Acci_n','Cantidad_producto','Prefijo','Consecutivo','No_cuota','Fecha_vencimiento',
                         'C_digo_impuesto','C_digo_grupo_activo_fijo','C_digo_activo_fijo','Descripci_n','C_digo_centro_subcentro_de_costos1','D_bito','Cr_dito',
                         'Observaciones','Base_gravable_libro_compras_ventas','Base_exenta_libro_compras_ventas','Mes_de_cierre','Periodo','Nomina']
    DataFrame["C_digo_cuenta_contable_text"] = DataFrame["C_digo_cuenta_contable_text"].astype(int).astype(str)
    # Realizar consulta
     # Llamar API de zoho para actualizar datos del consecutivo
    # refresh_ = '1000.361a90e9a2b60154103970f01fb42e33.b9220687af76e357bb1e1e4aefc95d95'
    # url = 'https://accounts.zoho.com/oauth/v2/token?refresh_token=' + refresh_ + '&client_id=1000.1X8CFKQHNVMIQYBM2LD5D630UAMMXB&client_secret=ed77d9ad812478a75cb46e11db1bbc262b8f1d49bf&grant_type=refresh_token'
    # cabeceras = {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"} 
    # auth_data = {"answer": "42" }
    # resp = requests.post(url, data=auth_data,headers=cabeceras)
    # posts = resp.json()
    Token_ = AccesToken()
    #Seccionar el taaño de este dataframe
    Tamaño_ = len(DataFrame.index)
    print("Tamaño")
    print(Tamaño_)
    if(Tamaño_ > 200):
        DataFrameEnviar =DataFrame[0:200]
        js = DataFrameEnviar.to_json(orient = 'records')
        Datos_ = {"data":
            js
        }
        Datos_ = json.dumps(Datos_)
        url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/form/Comprobantes_contables"
        header = {"Authorization":"Zoho-oauthtoken "+Token_, "Access-Control-Allow-Origin": "*"} 
        r = requests.post(url_,data=Datos_,headers=header)
        print(r.json())
    else:
        js = DataFrame.to_json(orient = 'records')
        Datos_ = {"data":
            js
        }
        Datos_ = json.dumps(Datos_)
        url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/form/Comprobantes_contables"
        header = {"Authorization":"Zoho-oauthtoken "+Token_, "Access-Control-Allow-Origin": "*"} 
        r = requests.post(url_,data=Datos_,headers=header)
    if (Tamaño_ > 400):
        DataFrameEnviar =DataFrame[200:400]
        js = DataFrameEnviar.to_json(orient = 'records')
        Datos_ = {"data":
            js
        }
        Datos_ = json.dumps(Datos_)
        url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/form/Comprobantes_contables"
        header = {"Authorization":"Zoho-oauthtoken "+Token_, "Access-Control-Allow-Origin": "*"} 
        r = requests.post(url_,data=Datos_,headers=header)
        print(r.json())
        #Segunda parte
        DataFrameEnviar =DataFrame[400:Tamaño_+1]
        js = DataFrameEnviar.to_json(orient = 'records')
        Datos_ = {"data":
            js
        }
        Datos_ = json.dumps(Datos_)
        url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/form/Comprobantes_contables"
        header = {"Authorization":"Zoho-oauthtoken "+Token_, "Access-Control-Allow-Origin": "*"} 
        r = requests.post(url_,data=Datos_,headers=header)
        print(r.json())
    else:
        DataFrameEnviar =DataFrame[200:Tamaño_+1]
        js = DataFrameEnviar.to_json(orient = 'records')
        Datos_ = {"data":
            js
        }
        Datos_ = json.dumps(Datos_)
        url_ = "https://creator.zoho.com/api/v2/hq5colombia/compensacionhq5/form/Comprobantes_contables"
        header = {"Authorization":"Zoho-oauthtoken "+Token_, "Access-Control-Allow-Origin": "*"} 
        r = requests.post(url_,data=Datos_,headers=header)
        print(r.json())
            
def AccesTokenBloqueo(bloqueo):
    global tiempo_
    global token
    # VALIDAR CON LA LECTURA DEL DOCUMENTO TXT
    # open("public/token.txt","w")
   
    if(tiempo_ == 0):
        tiempo_ = time.time()
    TiempoActual_ = time.time()
    restaTiempo = TiempoActual_ - tiempo_
    if(restaTiempo > 3600 or restaTiempo == 0):
        with bloqueo:
    # if(restaTiempo > 60 or restaTiempo == 0):
            refresh_ = '1000.33a5526ca066d526ee93e1d4eac2c002.c2707bc77a9bb1cfcb29e590da4581b8'
            url = 'https://accounts.zoho.com/oauth/v2/token?refresh_token=' + refresh_ + '&client_id=1000.1X8CFKQHNVMIQYBM2LD5D630UAMMXB&client_secret=ed77d9ad812478a75cb46e11db1bbc262b8f1d49bf&grant_type=refresh_token'
            cabeceras = {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"} 
            auth_data = {"answer": "42" }
            resp = requests.post(url, data=auth_data,headers=cabeceras)
            posts = resp.json()
            # print("Respuesta de token")
            # print(posts)
            if "access_token" in posts:
                token = posts['access_token']
            else:
                time.sleep(5)
                refresh_ = '1000.33a5526ca066d526ee93e1d4eac2c002.c2707bc77a9bb1cfcb29e590da4581b8'
                url = 'https://accounts.zoho.com/oauth/v2/token?refresh_token=' + refresh_ + '&client_id=1000.1X8CFKQHNVMIQYBM2LD5D630UAMMXB&client_secret=ed77d9ad812478a75cb46e11db1bbc262b8f1d49bf&grant_type=refresh_token'
                cabeceras = {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"} 
                auth_data = {"answer": "42" }
                resp = requests.post(url, data=auth_data,headers=cabeceras)
                posts = resp.json()
                token = posts['access_token']
    return token
            
def AccesToken():
    global tiempo_
    global token
    # VALIDAR CON LA LECTURA DEL DOCUMENTO TXT
    # open("public/token.txt","w")
    if(tiempo_ == 0):
        tiempo_ = time.time()
    TiempoActual_ = time.time()
    restaTiempo = TiempoActual_ - tiempo_
    if(restaTiempo > 3600 or restaTiempo == 0):
        refresh_ = '1000.33a5526ca066d526ee93e1d4eac2c002.c2707bc77a9bb1cfcb29e590da4581b8'
        url = 'https://accounts.zoho.com/oauth/v2/token?refresh_token=' + refresh_ + '&client_id=1000.1X8CFKQHNVMIQYBM2LD5D630UAMMXB&client_secret=ed77d9ad812478a75cb46e11db1bbc262b8f1d49bf&grant_type=refresh_token'
        cabeceras = {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"} 
        auth_data = {"answer": "42" }
        resp = requests.post(url, data=auth_data,headers=cabeceras)
        posts = resp.json()
        # print("Respuesta de token")
        # print(posts)
        if "access_token" in posts:
            token = posts['access_token']
        else:
            time.sleep(5)
            refresh_ = '1000.33a5526ca066d526ee93e1d4eac2c002.c2707bc77a9bb1cfcb29e590da4581b8'
            url = 'https://accounts.zoho.com/oauth/v2/token?refresh_token=' + refresh_ + '&client_id=1000.1X8CFKQHNVMIQYBM2LD5D630UAMMXB&client_secret=ed77d9ad812478a75cb46e11db1bbc262b8f1d49bf&grant_type=refresh_token'
            cabeceras = {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"} 
            auth_data = {"answer": "42" }
            resp = requests.post(url, data=auth_data,headers=cabeceras)
            posts = resp.json()
            token = posts['access_token']
        
    return token
            
            
# Funcion para generar el comprobante
def NuevaLineaComprobantesContables(Consecutivo_,FechaFinal_,CodigoCuentaContable_,Identificacion_,Descripcion_,CodigoCentro_,Debito_,Credito_,IDPeriodo_,TipoDeComprobante_,_Nomina,tipoPeriodo,_Empresa):
    NumeroConsecutivoTEMPO_= Consecutivo_
    Anio_ = FechaFinal_.year
    Mes_ = FechaFinal_.month
    FechaFinal_ = FechaFinal_.strftime('%d-%m-%Y')
    #Empezar a armar la linea del dataframe
    FilaAgregar = {}
    FilaAgregar["Tipo de Comprobante"] = TipoDeComprobante_
    FilaAgregar["Consecutivo comprobante"] = NumeroConsecutivoTEMPO_
    FilaAgregar["Fecha de elaboración"] = FechaFinal_
    FilaAgregar["Sigla moneda"] = ""
    FilaAgregar["Tasa de cambio"] = ""
    FilaAgregar["Código cuenta contable"] = CodigoCuentaContable_
    FilaAgregar["Identificación tercero"] = Identificacion_
    FilaAgregar["Sucursal"] = ""
    FilaAgregar["Código producto"] = ""
    FilaAgregar["Código de bodega"] = ""
    FilaAgregar["Acción"] = ""
    FilaAgregar["Cantidad producto"] = ""
    FilaAgregar["Prefijo"] = ""
    FilaAgregar["Consecutivo"] = ""
    FilaAgregar["No. cuota"] = ""
    FilaAgregar["Fecha vencimiento"] = ""
    FilaAgregar["Código impuesto"] = ""
    FilaAgregar["Código grupo activo fijo"] = ""
    FilaAgregar["Código activo fijo"] = ""
    FilaAgregar["Descripción"] = Descripcion_
    FilaAgregar["Código centro/subcentro de costos"] = CodigoCentro_
    FilaAgregar["Débito"] = Debito_
    FilaAgregar["Crédito"] = Credito_
    FilaAgregar["Observaciones"] = Descripcion_
    FilaAgregar["Base gravable libro compras/ventas  "] = ""
    FilaAgregar["Base exenta libro compras/ventas"] = ""
    FilaAgregar["Mes de cierre"] = ""
    FilaAgregar["Consecutivo"] = ""
    FilaAgregar["Periodo"] = str(Anio_) + str(Mes_)
    FilaAgregar["Tipo de periodo"] = tipoPeriodo
    FilaAgregar["Nomina"] = _Nomina
    FilaAgregar["Empresa"] = _Empresa
    # Validar_Comprobante=IDNomina_.ID
    # Crear_Periodo=_IDPeriodo
    # sobrante=sobrante_
    return FilaAgregar

def HilosPorDF(df1,tipoPeriodo,bloqueo):
    # return "Hola"
    global Consecutivo_
    Periodo_  = df1['Id Periodo'].unique().tolist()
    ListaNomina = []
    # Nomina_  = df1['ID'].unique().tolist()
    # RECORER POR ID PERIODO
    ComprobanteTotal_ = pd.DataFrame() 
    for periodosX_ in Periodo_:
        Valores = df1['Id Periodo'] == periodosX_
        # print(Valores)
        ContratoPos = df1[Valores]
        # print(ContratoPos)
        # NOMINAS
        Nomina_  = ContratoPos['ID'].unique().tolist()
        # print(Nomina_)
        contador_ = 0
        for NominaX_ in Nomina_:
            # contador_ += 1
            #SacarValores de la nomina del empleado
            Valores = df1['ID'] == NominaX_
            NominaEmpleado = df1[Valores]
            ##CALCULAR EL TODO LO DEL COMPROBANTE CONTABLE
            #Comprobante
            Comprobante = pd.DataFrame()
            Nomina_ = "Nom=" + str(NominaEmpleado.iloc[0]['Código del cliente'])
            CodigoCentro_ = str(NominaEmpleado.iloc[0]['Código del cliente']) + "-1"
            Contrato_ = "Cont=" + str(NominaEmpleado.iloc[0]['Numero de Contrato'])
            Periodo_ = "Per=" + str(periodosX_)
            IDPeriodo_ = periodosX_
            Empresa_ = str(NominaEmpleado.iloc[0]['Empresa Usuaria'])
            Identificacion_ = str(NominaEmpleado.iloc[0]['Numero de Identificación'])
            # IDNomina_ = str(NominaEmpleado.iloc[0]['Id Proceso'])
            IDNomina_ = str(NominaEmpleado.iloc[0]['ID'])
            #Tipo de comprobante
            TipoComprobante = "19" 
            TipoDeComprobante_ = "19"
            if(tipoPeriodo == "1" or tipoPeriodo == "2" or tipoPeriodo == "3" or tipoPeriodo == "13" ):
                TipoComprobante = "992"
                TipoDeComprobante_ = "992"
            elif(tipoPeriodo == "15"):
                TipoComprobante = "22"
                TipoDeComprobante_ = "22"
            
            # print("Procesar comproante contables")
            PreCodigoContable_ = 0
            ValidadorEmpleadoPlanta_ = False
            if(str(NominaEmpleado.iloc[0]['Es proceso interno']) == "SI"):
                ValidadorEmpleadoPlanta_ = True
                PreCodigoContable_ = 5105
                if(str(NominaEmpleado.iloc[0]['Proceso']) == "COMERCIAL" and str(NominaEmpleado.iloc[0]['Numero de Identificación']) != "1015456966"):
                    PreCodigoContable_ = 5205
            if(NominaEmpleado['Neto'].sum() > 0 ):
                Credito_ = round(NominaEmpleado['Neto'].sum())
                Debito_ = 0
                CodigoCuentaContable_ = 250501
                if(ValidadorEmpleadoPlanta_):
                    CodigoCuentaContable_ = str(CodigoCuentaContable_)
                    cuentacontable_ = CodigoCuentaContable_[4:len(CodigoCuentaContable_)]
                    CodigoCuentaContable_ = int(str(PreCodigoContable_)+cuentacontable_)
                Concepto_ = "Concept=" + "52"
                Descripcion_ = Nomina_ + "," + Contrato_ + "," + Periodo_ + "," + Concepto_
                # FechaFinal_ = NominaEmpleado.iloc[0]['Fecha Final'].date()
                FechaFinal_ = NominaEmpleado.iloc[0]['Fecha Final'].date()
                # FechaFinal_ = pd.to_date(NominaEmpleado.iloc[0]['Fecha Final'], format='%d/%m/%Y')
                FilaAgregar = NuevaLineaComprobantesContables(Consecutivo_,FechaFinal_,CodigoCuentaContable_,Identificacion_,Descripcion_,CodigoCentro_,Debito_,Credito_,IDPeriodo_,TipoDeComprobante_,IDNomina_,tipoPeriodo,Empresa_)
                # Comprobante = Comprobante.append(FilaAgregar, ignore_index=True)
                Comprobante = pd.concat([Comprobante,pd.DataFrame.from_records([FilaAgregar])],ignore_index=True)
                Debito_ = 0
                Credito_ = 0
                
            ##Sacar comprobante para las provisiones
            # 3960020000007732631,3960020000007732623,3960020000007732627,3960020000007732619
            Provisiones ={'Vacaciones tiempo':[617539,25250101,"513"],'Cesantías':[617530,251010,"511"],'Interés cesantías':[617533,251501,"512"],'Prima':[617536,252001,"510"]}
            for ProvisionesX in Provisiones:
                Valor = Provisiones[ProvisionesX]
                #Debito
                Debito_ =  round(NominaEmpleado[ProvisionesX].sum())
                if(Debito_ > 0):
                    Credito_ = 0
                    CodigoCuentaContable_ = Valor[0]
                    if(ValidadorEmpleadoPlanta_):
                        CodigoCuentaContable_ = str(CodigoCuentaContable_)
                        cuentacontable_ = CodigoCuentaContable_[4:len(CodigoCuentaContable_)]
                        CodigoCuentaContable_ = int(str(PreCodigoContable_)+cuentacontable_)
                    Concepto_ = "Concept=" + Valor[2]
                    Descripcion_ = Nomina_ + "," + Contrato_ + "," + Periodo_ + "," + Concepto_
                    # FechaFinal_ = NominaEmpleado.iloc[0]['Fecha Final'].date()
                    FechaFinal_ = NominaEmpleado.iloc[0]['Fecha Final'].date()
                    # FechaFinal_ = pd.to_date(NominaEmpleado.iloc[0]['Fecha Final'], format='%d/%m/%Y')
                    FilaAgregar = NuevaLineaComprobantesContables(Consecutivo_,FechaFinal_,CodigoCuentaContable_,Identificacion_,Descripcion_,CodigoCentro_,Debito_,Credito_,IDPeriodo_,TipoDeComprobante_,IDNomina_,tipoPeriodo,Empresa_)
                    # Comprobante = Comprobante.append(FilaAgregar, ignore_index=True)
                    Comprobante = pd.concat([Comprobante,pd.DataFrame.from_records([FilaAgregar])],ignore_index=True)
                    Debito_ = 0
                    Credito_ = 0
                    #Credito
                    Debito_ = 0
                    Credito_ =  round(NominaEmpleado[ProvisionesX].sum())
                    CodigoCuentaContable_ = Valor[1]
                    Concepto_ = "Concept=" + Valor[2]
                    Descripcion_ = Nomina_ + "," + Contrato_ + "," + Periodo_ + "," + Concepto_
                    FilaAgregar = NuevaLineaComprobantesContables(Consecutivo_,FechaFinal_,CodigoCuentaContable_,Identificacion_,Descripcion_,CodigoCentro_,Debito_,Credito_,IDPeriodo_,TipoDeComprobante_,IDNomina_,tipoPeriodo,Empresa_)
                    # Comprobante = Comprobante.append(FilaAgregar, ignore_index=True)
                    Comprobante = pd.concat([Comprobante,pd.DataFrame.from_records([FilaAgregar])],ignore_index=True)
                    Credito_ = 0
                    Debito_ = 0
            ##Sacar comprobante para seguridad social
            # 3960020000007732595,3960020000007732607,3960020000007732599,3960020000007732583,3960020000007732615,3960020000007732523,3960020000007732603
            Seguridad ={'EPS':[617569,23700502,"500"],'CCF':[617572,23701001,"503"],'AFP':[617570,23803002,"501"],'FSP':[0,23803001,"452"],'SENA':[617578,23701002,"505"],'ICBF':[617575,23701003,"267"],'ARL':[617568,237006,"502"]}
            for SeguridadX in Seguridad:
                Valor = Seguridad[SeguridadX]
                #Debito
                Debito_ =  round(NominaEmpleado[SeguridadX].sum())
                if(Debito_ > 0):
                    Credito_ = 0
                    CodigoCuentaContable_ = Valor[0]
                    if(ValidadorEmpleadoPlanta_):
                        CodigoCuentaContable_ = str(CodigoCuentaContable_)
                        cuentacontable_ = CodigoCuentaContable_[4:len(CodigoCuentaContable_)]
                        CodigoCuentaContable_ = int(str(PreCodigoContable_)+cuentacontable_)
                    Concepto_ = "Concept=" + Valor[2]
                    Descripcion_ = Nomina_ + "," + Contrato_ + "," + Periodo_ + "," + Concepto_
                    # FechaFinal_ = NominaEmpleado.iloc[0]['Fecha Final'].date()
                    FechaFinal_ = NominaEmpleado.iloc[0]['Fecha Final'].date()
                    # FechaFinal_ = pd.to_date(NominaEmpleado.iloc[0]['Fecha Final'], format='%d/%m/%Y')
                    FilaAgregar = NuevaLineaComprobantesContables(Consecutivo_,FechaFinal_,CodigoCuentaContable_,Identificacion_,Descripcion_,CodigoCentro_,Debito_,Credito_,IDPeriodo_,TipoDeComprobante_,IDNomina_,tipoPeriodo,Empresa_)
                    # Comprobante = Comprobante.append(FilaAgregar, ignore_index=True)
                    Comprobante = pd.concat([Comprobante,pd.DataFrame.from_records([FilaAgregar])],ignore_index=True)
                    Debito_ = 0
                    Credito_ = 0
                    #Credito
                    Debito_ = 0
                    Credito_ =  round(NominaEmpleado[SeguridadX].sum())
                    CodigoCuentaContable_ = Valor[1]
                    Concepto_ = "Concept=" + Valor[2]
                    Descripcion_ = Nomina_ + "," + Contrato_ + "," + Periodo_ + "," + Concepto_
                    FilaAgregar = NuevaLineaComprobantesContables(Consecutivo_,FechaFinal_,CodigoCuentaContable_,Identificacion_,Descripcion_,CodigoCentro_,Debito_,Credito_,IDPeriodo_,TipoDeComprobante_,IDNomina_,tipoPeriodo,Empresa_)
                    Credito_ = 0
                    Debito_ = 0
                    # Comprobante = Comprobante.append(FilaAgregar, ignore_index=True)
                    Comprobante = pd.concat([Comprobante,pd.DataFrame.from_records([FilaAgregar])],ignore_index=True)
            
            
            # TODOS LOS CONCEPTOS QUE TIENE LA NOMINA
            URL1= "https://creatorapp.zohopublic.com/hq5colombia/compensacionhq5/xls/Conceptos_Nomina_Desarrollo/jwhRFUOR47TqCS9AAT82eCybwgdmgeArEtKG7U8H9s3hSjTzBd3G8bPdg37PHVygvxurxwCQvMCgHRG68dOCWKTmMWaQJU2TMwnr?Nomina=" + str(NominaX_)
            dfConceptos = pd.read_excel(URL1)
            dfConceptos1 = pd.DataFrame(dfConceptos)
            for i in range(len(dfConceptos1)):
                Neto_ =  round(dfConceptos1.iloc[i]['Neto'])
                Debito_ = 0
                Credito_ = 0
                CodigoCuentaContable_ = ""
                if(Neto_ < 0):
                    Credito_ = Neto_ * -1
                else:
                    Debito_ = Neto_
                if(Debito_ > 0 ):
                    CodigoCuentaContable_ = dfConceptos1.iloc[i]['Cuenta contable Devengo']
                    # print(CodigoCuentaContable_)
                    # print(str(dfConceptos1.iloc[i]['Cuenta contable Devengo']))
                    if( math.isnan(dfConceptos1.iloc[i]['Cuenta contable Devengo'])):
                        CodigoCuentaContable_ = 0
                        # print(CodigoCuentaContable_)
                    if(ValidadorEmpleadoPlanta_):
                        CodigoCuentaContable_ = str(int(CodigoCuentaContable_))
                        cuentacontable_ = CodigoCuentaContable_[4:len(CodigoCuentaContable_)]
                        CodigoCuentaContable_ = int(str(PreCodigoContable_)+cuentacontable_)
                if(Credito_>0):
                    CodigoCuentaContable_ = dfConceptos1.iloc[i]['Cuenta contable Descuento / Provision']
                    if(math.isnan(dfConceptos1.iloc[i]['Cuenta contable Descuento / Provision'])):
                        CodigoCuentaContable_ = 0
                if(Neto_ == 0 ):
                    if(str(dfConceptos1.iloc[i]['Naturaleza']) == "Devengado"):
                        CodigoCuentaContable_ = dfConceptos1.iloc[i]['Cuenta contable Devengo']
                        if(math.isnan(dfConceptos1.iloc[i]['Cuenta contable Devengo'])):
                            CodigoCuentaContable_ = 0
                        if(ValidadorEmpleadoPlanta_):
                            CodigoCuentaContable_ = str(int(CodigoCuentaContable_))
                            cuentacontable_ = CodigoCuentaContable_[4:len(CodigoCuentaContable_)]
                            CodigoCuentaContable_ = int(str(PreCodigoContable_)+cuentacontable_)
                    else:
                        CodigoCuentaContable_ = dfConceptos1.iloc[i]['Cuenta contable Descuento / Provision']
                        if(math.isnan(dfConceptos1.iloc[i]['Cuenta contable Descuento / Provision'])):
                            CodigoCuentaContable_ = 0
                
                Concepto_ = "Concept=" + str(dfConceptos1.iloc[i]['ID Concepto'])
                Descripcion_ = Nomina_ + "," + Contrato_ + "," + Periodo_ + "," + Concepto_
                FilaAgregar = NuevaLineaComprobantesContables(Consecutivo_,FechaFinal_,CodigoCuentaContable_,Identificacion_,Descripcion_,CodigoCentro_,Debito_,Credito_,IDPeriodo_,TipoDeComprobante_,IDNomina_,tipoPeriodo,Empresa_)
                # Comprobante = Comprobante.append(FilaAgregar, ignore_index=True)
                Comprobante = pd.concat([Comprobante,pd.DataFrame.from_records([FilaAgregar])],ignore_index=True)
            #Cierra conceptos
            ##AgregarNomina a la lista 
            ListaNomina.append(str(NominaX_))
            # print(r.json())
        #Cierra Nomina
    #Cierra periodo
            longitudComprobante_ = len(Comprobante)
            longitudComprobanteTotal_ = len(ComprobanteTotal_)
            SumaComprobantes = longitudComprobanteTotal_ + longitudComprobante_
            # print("SUMA1" + str(longitudComprobante_))
            # print("SUMA2 " + str(longitudComprobanteTotal_))
            # print("SUMA " + str(SumaComprobantes))
            if( SumaComprobantes < 499 ):
                # ComprobanteTotal_ = ComprobanteTotal_.append(Comprobante, ignore_index=True)
                # ComprobanteTotal_ = pd.concat([ComprobanteTotal_,pd.DataFrame.from_records([Comprobante])],ignore_index=True)
                frames = [ComprobanteTotal_, Comprobante]
  
                ComprobanteTotal_ = pd.concat(frames)
            else:
                # DIRECTORIO_BASE  = os.getcwdb()
                # Directorioalmacenar_ = os.path.join(DIRECTORIO_BASE , 'ArchivosComprobates')
                # ComprobanteTotal_.to_excel("Comprobante"+ str(IDPeriodo_)+ "_" + str(Consecutivo_) +".xlsx",index=False)
                ComprobanteTotal_.to_excel("Comprobante"+ str(IDPeriodo_)+ "_" + str(Consecutivo_) +".xlsx",index=False)
                # IngresarComprobantescontables(ComprobanteTotal_)
                longitud = len(ListaNomina)
                IngresararchivoComprobante(IDPeriodo_,longitud,bloqueo)
                marcarNominas(ListaNomina,bloqueo)
                ListaNomina=[]
                ComprobanteTotal_ = pd.DataFrame()
                # Consecutivo_ +=1
                with bloqueo:
                    #sección crítica
                    temp = Consecutivo_
                    temp += 1
                    Consecutivo_ = temp
                Comprobante['Consecutivo comprobante']=Consecutivo_
                # ComprobanteTotal_ = ComprobanteTotal_.append(Comprobante, ignore_index=True)
                # ComprobanteTotal_ = pd.concat([ComprobanteTotal_,pd.DataFrame.from_records([Comprobante])],ignore_index=True)
                frames = [ComprobanteTotal_, Comprobante]
  
                ComprobanteTotal_ = pd.concat(frames)
                Comprobante = {}
                actualizarConsecutivo(Consecutivo_,bloqueo)
           
        # DIRECTORIO_BASE  = os.getcwdb()
        # # print(DIRECTORIO_BASE)
        # Directorioalmacenar_ = os.path.join(DIRECTORIO_BASE , 'ArchivosComprobates')
        # ComprobanteTotal_.to_excel("Comprobante"+ str(IDPeriodo_)+ "_" + str(Consecutivo_) +".xlsx",index=False)
        ComprobanteTotal_.to_excel("Comprobante"+ str(IDPeriodo_)+ "_" + str(Consecutivo_) +".xlsx",index=False)
        # IngresarComprobantescontables(ComprobanteTotal_)
        longitud = len(ListaNomina)
        IngresararchivoComprobante(IDPeriodo_,longitud,bloqueo)
        marcarNominas(ListaNomina,bloqueo)     
        ListaNomina=[]
        ComprobanteTotal_ = ComprobanteTotal_ = pd.DataFrame()
        # Consecutivo_ +=1
        with bloqueo:
            #sección crítica
            temp = Consecutivo_
            temp += 1
            Consecutivo_ = temp
        actualizarConsecutivo(Consecutivo_,bloqueo)
            

procesar()

