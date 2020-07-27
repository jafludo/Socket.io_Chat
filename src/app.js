const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const ent = require('ent');
var cors = require('cors');  
const io = require('socket.io')(server);

io.sockets.on('connection', function (socket, pseudo) {
    console.log("client connected !"+socket)
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatdb', {useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const whitelist = ['http://127.0.0.1:3000'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions));

app.use(express.static('../public'));

const indexRoute = require('./api/routes/indexRoute');
indexRoute(app);

const userRoute = require('./api/routes/userRoute');
userRoute(app);

app.listen(3000);