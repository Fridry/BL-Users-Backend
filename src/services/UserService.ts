import User, { UserAttributes } from "../database/schemas/User";

class UserService {
  
  async findUsers(): Promise<any> {
    const users = await User.find()
    
    return users
  }
  
  async findUser(cpf: string): Promise<any> {
    const user = await User.findOne({ cpf })
    
    return user
  }
  
  async createUser(userData: UserAttributes): Promise<any> {
    const { name, lastname, phone, cpf } = userData

    const user = await User.create({ name, lastname, phone, cpf })

    return user
  }

  async updateUser(cpf: string, updatedData: Partial<UserAttributes>): Promise<any> {
    const user = await User.findOneAndUpdate({ cpf }, updatedData, {
      new: true
    })

    return user
  }

  async deleteUser(cpf: string): Promise<void> {
    await User.findOneAndDelete({ cpf })
  }
}

export default UserService