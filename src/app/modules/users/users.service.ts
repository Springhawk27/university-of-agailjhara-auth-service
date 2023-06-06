import config from '../../../config'
import ApiError from '../../../errors/ApiErrors'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

// we will not use req,res in service. Controller will handle these things
const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUserId()

  user.id = id
  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const createdUser = await User.create(user)
  // if (!createUser) {
  //   throw new Error('Failed to create user')
  // }
  if (!createUser) {
    throw new ApiError(400, 'Failed to create user2')
  }

  return createdUser
}

export default {
  createUser,
}
