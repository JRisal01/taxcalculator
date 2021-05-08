const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "jrisal",
    database: "taxcalc"
});

module.exports = con;