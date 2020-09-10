module.exports = (app,io) => {
    const socketController = require('../controllers/socketController');

    socketController.initserver(io);
    app.route('/sockets/?')
    .get(socketController.get_sockets)


}