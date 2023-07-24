const mysqlDB = {
    host: process.env.MYSQL_HOST || '164.92.109.128',
    user: process.env.MYSQL_USER || 'desarrollo',
    password: process.env.MYSQL_PASSWORD || "Kio09/12J",
    database : process.env.MYSQL_DB || 'dbdata',
    port:3306,
//         host: '201.184.98.75',
//         user: 'desarrollo3',
//         password: "5cTmZk25f",
//         database : 'hoja_de_vida',
//         port:3306,
}
export {mysqlDB}