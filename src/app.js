const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log("client connected !"+socket)
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatdb', {useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.use(bodyParser.json());

const userRoute = require('./api/routes/userRoute');
userRoute(app);

app.listen(3000);