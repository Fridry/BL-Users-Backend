import mongoose from 'mongoose'

import faker from 'faker'
import { cpf } from 'cpf-cnpj-validator'

faker.locale = 'pt_BR'

import User, { UserAttributes } from '../database/schemas/User'
import UserService from './UserService'

describe('UserService', () => {
  beforeAll(async () => {
    if(!process.env.MONGO_URL) {
      throw new Error('MongoDb server not initialized');
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })


  beforeEach(async () => {
    await User.deleteMany({})
  })

  const fakeUserData: UserAttributes = {
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    cpf: cpf.generate(),
  }

  const makeSut = (): UserService => {
    return new UserService()
  } 

  it('should add a new user', async () => {
    const sut = makeSut()
    
    const user = await sut.createUser(fakeUserData)

    expect(user).toEqual(expect.objectContaining(
      {
        name: fakeUserData.name
      }
    ))
  })

  it('should return an array of users', async () => {
    const sut = makeSut()

    await sut.createUser(fakeUserData)

    const users = await sut.findUsers()

    expect(users).toEqual(expect.arrayContaining(
      [
        expect.objectContaining(
          {
            name: fakeUserData.name
          }
        )
      ]
    ))
  })

  it('should return a user based on the CPF', async () => {
    const sut = makeSut()

    await sut.createUser(fakeUserData)

    const user = await sut.findUser(fakeUserData.cpf)

    expect(user).toEqual(expect.objectContaining(
      {
        name: fakeUserData.name, 
        lastname: fakeUserData.lastname, 
        phone: fakeUserData.phone, 
        cpf: fakeUserData.cpf, 
      }
    ))
  })

  it('should update an user based on the CPF', async () => {
    const sut = makeSut()

    await sut.createUser(fakeUserData)

    const userCreated = await sut.findUser(fakeUserData.cpf)

    expect(userCreated).toEqual(expect.objectContaining(
      {
        name: fakeUserData.name
      }
    ))

    const updatedData = {
      name: faker.name.firstName()
    }

    const userFound = await sut.updateUser(fakeUserData.cpf, updatedData)

    expect(userFound).toEqual(expect.objectContaining(
      {
        name: updatedData.name
      }
    ))
  })

  it('should delete an user based on the CPF', async () => {
    const sut = makeSut()

    await sut.createUser(fakeUserData)

    const userCreated = await sut.findUser(fakeUserData.cpf)

    expect(userCreated).toEqual(expect.objectContaining(
      {
        name: fakeUserData.name
      }
    ))

    await sut.deleteUser(fakeUserData.cpf)

    const userDeleted = await sut.findUser(fakeUserData.cpf)

    expect(userDeleted).toBeNull()
  })
})