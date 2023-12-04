import express from 'express'
import * as usersController from '../controllers/users.api.controllers.js'

import {isLogin, isAdmin} from '../middleware/auth.middleware.js'
import {ValidateLogin, ValidateRegister} from '../middleware/validar.middleware.js'

const router = express.Router()


// Sesion
router.route('/api/users/login')
    .post(usersController.login)

router.route('/api/users/logout')
    .post(usersController.logout)


//Para encontrar usuarios según el id del entrenador, y crearlos
router.route('/api/users')
    .post(usersController.createUser)

//Para encontrar y/o eliminar un usuario
router.route('/api/user/:userId')
    .get([isLogin, isAdmin],usersController.getUserById)
    .delete([isLogin, isAdmin],usersController.removeUser)









export default router