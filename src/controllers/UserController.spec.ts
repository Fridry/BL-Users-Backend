// import { Request, Response } from 'express'
// import faker from 'faker'
// import { cpf as cpfValidator } from 'cpf-cnpj-validator'
// import { getMockReq, getMockRes } from '@jest-mock/express'

// import UserController from "./UserController"
// import User, { UserAttributes } from '../database/schemas/User'
// interface SutTypes {
//   sut: UserController
// }

// const makeSut = (): SutTypes => {
//   const sut = new UserController()

//   return  {
//     sut
//   }
// }

// const fakeUserData: UserAttributes = {
//   name: faker.name.firstName(),
//   lastname: faker.name.lastName(),
//   phone: faker.phone.phoneNumber(),
//   cpf: cpfValidator.generate(),
// }

// describe('UserController', () => {
//   beforeEach(() => {
//     const { mockClear } = getMockRes()

//     mockClear()
//   })

//   describe('listUsers', () => {
//     it('should return a list of users', async () => {
//       expect(1+2).toBe(3)
//     })
//   })

//   describe('listUser', () => {
//     it('should return 400 if no CPF is provided', async () => {
//       const { sut } = makeSut()

//       const httpRequest = getMockReq({
//         params: {}
//       })

//       const httpResponse = getMockRes({
//         statusCode: 400,
//         statusMessage: 'CPF obrigatório.'
//       })

//       const user = await sut.listUser(httpRequest, httpResponse.res)

//       expect(user.statusCode).toEqual(400)
//       expect(user.statusMessage).toEqual('CPF obrigatório.')
//     })

//     it('should return 400 if an invalid CPF is provided', async () => {
//       const { sut } = makeSut()

//       const httpRequest = getMockReq({
//         params: {
//           cpf: '00000000000'
//         }
//       })

//       const httpResponse = getMockRes({
//         statusCode: 400,
//         statusMessage: 'CPF inválido.'
//       })

//       const user = await sut.listUser(httpRequest, httpResponse.res)

//       expect(user.statusCode).toEqual(400)
//       expect(user.statusMessage).toEqual('CPF inválido.')
//     })

//     it('should return 404 if a users with valid CPF does not exists', async () => {
//       const { sut } = makeSut()

//       const cpf = '03090303078'

//       await sut.createUser(fakeUserData)

//       const httpRequest = getMockReq({
//         params: {
//           cpf
//         }
//       })

//       const httpResponse = getMockRes({
//         statusCode: 404,
//         statusMessage: `Usuário com o CPF ${cpf} não encontrado.`
//       })

//       const user = await sut.listUser(httpRequest, httpResponse.res)

//       expect(user.statusCode).toEqual(400)
//       expect(user.statusMessage).toEqual(`Usuário com o CPF ${cpf} não encontrado.`)
//     })
//   })
// })
