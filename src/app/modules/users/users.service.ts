import { IUser } from './users.interface'
import { User } from './users.model'

// we will not use req,res in service. Controller will handle these things
const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  // default password
  const createdUser = await User.create(user)
  if (!createUser) {
    throw new Error('Failed to create user')
  }
  return createdUser
}

export default {
  createUser,
}
