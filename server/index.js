const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
var database = require('./config/database');
const { urlencoded } = require('body-parser');
var port = process.env.PORT || 3055;

database.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    } else {
        console.log('connected');
    }
})
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


app.get('/api/admin/get', (req, res) =>{
    const sqlSelect= "SELECT * FROM admin_login";
    database.query(sqlSelect, (err, result) =>{
        console.log(result)
    })
});



app.post("/api/insertContact", (req, res) => {

    const contactName = req.body.contactName
    const contactEmail = req.body.contactEmail
    const contactMessage = req.body.contactMessage

    const sqlInsert = "INSERT INTO home_contact (contactname, contactemail, contactmessage) VALUES (?,?,?)"
    database.query(sqlInsert, [contactName, contactEmail, contactMessage], (err, result) =>{
        console.log(result)
    })
});

app.listen(port, () => {
    console.log('running on port')
});