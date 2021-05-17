import { Request, Response } from 'express'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import * as Yup from 'yup'

import UserService from '../services/UserService'

class UserController {
  async listUsers(request: Request, response: Response): Promise<Response> {
    try {
      const User = new UserService()

      const users = await User.findUsers()

      return response.json(users) 
    } catch (error) {
      return response.status(500).json({ success: false, msg: error.message })
    }
  }

  async listUser(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params

    if(!cpf) {
      return response.status(400).json({ success: false, msg: 'CPF obrigatório.' })
    }

    const isCpfValid = cpfValidator.isValid(cpf)

    if(!isCpfValid) {
      return response.status(400).json({ success: false, msg: 'CPF inválido.' })
    }

    try {
      const User = new UserService()

      const user = await User.findUser(cpf)

      if(!user) {
        return response.status(404).json({ success: false, msg: `Informações do CPF ${cpf} não armazenadas.`})
      }

      return response.json(user) 
    } catch (error) {
      return response.status(500).json({ success: false, msg: error.message })
    }
  }

  async createUser(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const schema = Yup.object().shape({
      name: Yup.string().required('Campo name obrigatório.'),
      lastname: Yup.string().required('Campo lastname obrigatório.'),
      phone: Yup.string().required('Campo phone obrigatório.'),
      cpf: Yup.string().required('Campo cpf obrigatório.'),
    })

    if(!(await schema.validate(data))) {
      return response.status(400).json({ success: false, msg: 'Falha na validação.' })
    }

    const isCpfValid = cpfValidator.isValid(data.cpf)

    if(!isCpfValid) {
      return response.status(400).json({ success: false, msg: 'CPF inválido.' })
    }

    try {
      const User = new UserService()

      const userExists = await User.findUser(data.cpf)

      if(userExists) {
        return response.status(400).json({ success: false, msg: `O CPF ${data.cpf} já está armazenado no sistema.` })
      }

      const user = await User.createUser(data)

      return response.json(user)
    } catch (error) {
      return response.status(500).json({ success: false, msg: error.message })
    }
  }

  async updateUser(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params
    
    if(!cpf) {
      return response.status(400).json({ success: false, msg: 'CPF obrigatório.' })
    }
    
    const data = request.body
    
    const schema = Yup.object().shape({
      name: Yup.string(),
      lastname: Yup.string(),
      phone: Yup.string(),
      cpf: Yup.string().length(11, 'O CPF deve conter 11 caracteres.'),
    })

    if(!(await schema.isValid(data))) {
      return response.status(400).json({ success: false, msg: 'Falha na validação.' })
    }

    const isCpfValid = cpfValidator.isValid(cpf)

    if(!isCpfValid) {
      return response.status(400).json({ success: false, msg: 'CPF inválido.' })
    }

    try {
      const User = new UserService()

      const user = await User.findUser(cpf)

      if(!user) {
        return response.status(404).json({ success: false, msg: `Informações do CPF ${cpf} não armazenadas.`})
      }

      const updatedUser = await User.updateUser(cpf, data)

      return response.json(updatedUser) 
    } catch (error) {
      return response.status(500).json({ success: false, msg: error.message })
    }
  }

  async deleteUser(request: Request, response: Response): Promise<Response | void> {
    const { cpf } = request.params

    const isCpfValid = cpfValidator.isValid(cpf)

    if(!isCpfValid) {
      return response.status(400).json({ success: false, msg: 'CPF inválido.' })
    }

    try {
      const User = new UserService()

      const user = await User.findUser(cpf)

      if(!user) {
        return response.status(404).json({ success: false, msg: `Informações do CPF ${cpf} não armazenadas.`})
      }

      await User.deleteUser(cpf)

      response.json()
    } catch (error) {
      return response.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default UserController