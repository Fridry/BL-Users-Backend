import { Router } from 'express'

import UserController from './controllers/UserController'

const routes = Router()

const userController = new UserController()

routes.get('/user', userController.listUsers)
routes.get('/user/:cpf', userController.listUser)
routes.post('/user', userController.createUser)
routes.put('/user/:cpf', userController.updateUser)
routes.delete('/user/:cpf', userController.deleteUser)

export default routes