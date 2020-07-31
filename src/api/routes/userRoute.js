module.exports = (app) => {
    const userController = require('../controllers/userController');

    app.route('/users')
    .get(userController.list_all_users)
        
    app.route('/users/register')
    .post(userController.user_register)

    app.route('/users/login')
    .post(userController.user_login)
}