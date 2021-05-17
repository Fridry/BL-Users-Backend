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
      return response.status(500).json({ error: error.message })
    }
  }

  async listUser(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params

    const isCpfValid = cpfValidator.isValid(cpf)

    if(!isCpfValid) {
      return response.status(400).json({ error: 'CPF inválido.' })
    }

    try {
      const User = new UserService()

      const user = await User.findUser(cpf)

      if(!user) {
        return response.status(404).json({ error: `Usuário com o CPF ${cpf} não encontrado.`})
      }

      return response.json(user) 
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async createUser(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const schema = Yup.object().shape({
      name: Yup.string().required('Campo obrigatório.'),
      lastname: Yup.string().required('Campo obrigatório.'),
      phone: Yup.string().required('Campo obrigatório.').matches(/((\(\d{2}\)\s)|(\d{2}\s)|)(\d{4,5}\-\d{4})/, { error: 'Telefone inválido', excludeEmptyString: true }),
      cpf: Yup.string().required('Campo obrigatório.').length(11, 'O CPF deve conter 11 caracteres.'),
    })

    if(!(await schema.isValid(data))) {
      return response.status(400).json({ error: 'Falha na validação.' })
    }

    const isCpfValid = cpfValidator.isValid(data.cpf)

    if(!isCpfValid) {
      return response.status(400).json({ error: 'CPF inválido.' })
    }

    try {
      const User = new UserService()

      const userExists = await User.findUser(data.cpf)

      if(userExists) {
        return response.status(400).json({ error: `O CPF ${data.cpf} já está cadastrado no sistema.` })
      }

      const user = await User.createUser(data)

      return response.json(user)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async updateUser(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params
    
    if(!cpf) {
      return response.status(400).json({ error: 'CPF obrigatório.' })
    }
    
    const data = request.body
    
    const schema = Yup.object().shape({
      name: Yup.string(),
      lastname: Yup.string(),
      phone: Yup.string().matches(/((\(\d{2}\)\s)|(\d{2}\s)|)(\d{4,5}\-\d{4})/, { error: 'Telefone inválido', excludeEmptyString: true }),
      cpf: Yup.string().length(11, 'O CPF deve conter 11 caracteres.'),
    })

    if(!(await schema.isValid(data))) {
      return response.status(400).json({ error: 'Falha na validação.' })
    }

    const isCpfValid = cpfValidator.isValid(cpf)

    if(!isCpfValid) {
      return response.status(400).json({ error: 'CPF inválido.' })
    }

    try {
      const User = new UserService()

      const user = await User.findUser(cpf)

      if(!user) {
        return response.status(404).json({ error: `Usuário com o CPF ${cpf} não encontrado.`})
      }

      return response.json(user) 
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async deleteUser(request: Request, response: Response): Promise<Response | void> {
    const { cpf } = request.params

    const isCpfValid = cpfValidator.isValid(cpf)

    if(!isCpfValid) {
      return response.status(400).json({ error: 'CPF inválido.' })
    }

    try {
      const User = new UserService()

      const user = await User.findUser(cpf)

      if(!user) {
        return response.status(404).json({ error: `Usuário com o CPF ${cpf} não encontrado.`})
      }

      await User.deleteUser(cpf)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }
}

export default UserController