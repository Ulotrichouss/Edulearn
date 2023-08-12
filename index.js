const express = require('express')
const morgan = require('morgan')
const route = require('./routes/main.js')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express()

var http = require('http').createServer(app);
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json())

app.use(morgan("dev"))
app.use(cookieParser())
app.use("/assets", express.static(__dirname + "/public"));
app.use('/images',express.static('images'))

app.use(route);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connect DB Success"))
.catch((err) => console.error(err));

http.listen(port, () => console.log(`http://localhost:${port}`))
