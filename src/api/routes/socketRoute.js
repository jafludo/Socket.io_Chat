module.exports = (app,io) => {
    const socketController = require('../controllers/socketController');

    socketController.initserver(io);
    // app.route('/users')
    // .get(userController.list_all_users)


}