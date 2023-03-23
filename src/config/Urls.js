import fetch from "node-fetch"

async function AccesToken() {
    //Variables necesarias
    const url = "https://marketplacepruebas.aportesenlinea.com/Transversales.Servicios.Fachada/api/ControlAcceso/Autenticar";
    const NombreUsuario = "901023218PruebasNOM";
    const Password = "n3NR61M_Ngs7zd";
    const Aplicacion=  "E2271FA7-0FCA-4293-BF6D-53414286FDB0";
    const data= {
        "data":[{
            "NombreUsuario":NombreUsuario,
            "Password":Password,
            "Aplicacion":Aplicacion
        }]
    }
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type":"application/json",
        "Anon":"Mareigua.Fanaia"
    },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  async function postAPI(url = "", data = {},header = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers:header,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    console.log("post")
    console.log(response)
    // return response.json(); // parses JSON response into native JavaScript objects
    return response; // parses JSON response into native JavaScript objects
  }
  export {AccesToken,postAPI}