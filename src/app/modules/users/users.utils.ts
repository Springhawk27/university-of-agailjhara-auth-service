import { User } from './users.model'

export const findLastUserId = async () => {
  // lean will return a pure javacript object instead of a document(lean in mongodb)
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUser?.id
}

// let lastUserId = 0
export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return incrementedId

  // lastUserId++
  // return String(lastUserId).padStart(5, '0')
}
