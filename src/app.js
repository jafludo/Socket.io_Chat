const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
var server = http.createServer(app).listen("8080", function(){
 
});
const ent = require('ent');
var cors = require('cors');  
const io = require('socket.io').listen(server);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatdb', {useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

app.use(cors({credentials: true, origin: 'http://127.0.0.1:8080'}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(express.static('../public'));

const indexRoute = require('./api/routes/indexRoute');
indexRoute(app);

const userRoute = require('./api/routes/userRoute');
userRoute(app);

const socketRoute = require('./api/routes/socketRoute');
socketRoute(app,io);