const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
var database = require('./config/database');
const fileupload = require('express-fileupload')
const { urlencoded } = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'upload/'})


var port = process.env.PORT || 3055;

database.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    } else {
        console.log('connected');
    }
})
app.use(fileupload());
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


app.get('/api/get/login', (req, res) =>{
    const sqlSelect= "SELECT * FROM admin_login";
    database.query(sqlSelect, (err, result) =>{
        res.send(result)
    })
});

app.get('/api/get/news', (req, res) =>{
    const sqlSelect= "SELECT * FROM news";
    database.query(sqlSelect, (err, result) =>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
        console.log(result)
    })
});

app.get('/api/get/contact', (req, res) =>{
    const sqlSelect= "SELECT * FROM home_contact";
    database.query(sqlSelect, (err, result) =>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
        console.log(result)
    })
});

app.get('/api/get/taxrate', (req, res) =>{
    const sqlSelect= "SELECT * FROM tax";
    database.query(sqlSelect, (err, result) =>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
        console.log(result)
    })
});

app.get('/api/get/subscription_list', (req, res) =>{
    const sqlSelect= "SELECT * FROM subscriprion";
    database.query(sqlSelect, (err, result) =>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
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

app.post("/api/subscription", (req, res) => {

    const subEmail = req.body.subEmail

    const sqlInsert = "INSERT INTO subscriprion (subscriprion_email) VALUES (?)"
    database.query(sqlInsert, [subEmail], (err, result) =>{
        res.send("done")
    })
});


app.post("/api/news", (req, res) => {
    const newsHeading = req.body.newsHeading
    const newsContent = req.body.newsContent
    const sampleFile = req.body.sampleFile;

    console.log(sampleFile);
    console.log(newsHeading);
    console.log(newsContent);

    const sqlInsert = "INSERT INTO news (newstitle, newsimage, newscontent) VALUES (?,?,?)"
    database.query(sqlInsert, [newsHeading, sampleFile, newsContent], (err, result) =>{
        res.send(result)
    })
});


app.listen(port, () => {
    console.log('running on port')
});