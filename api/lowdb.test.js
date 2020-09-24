const {
  connectDB,
  authorizeUser,
  readUser,
  updateUserFields
} = require('./lowdb')

const jsonUsers = require('./data/users.json')

// TODO: mock the db so the tests don't change data

describe('lowdb functions', () => {

  it('should return a db cursor when connectDB is called', () => {
    const dbCursor = connectDB()
    expect(dbCursor).toBeTruthy()
  })

  it('should return the correct user when readUser is called', () => {
    const dbCursor = connectDB()
    const userGuid = 'eab0324c-75ef-49a1-9c49-be2d68f50b96'
    const user = readUser(dbCursor, userGuid)
    expect(user._id).toEqual('5410953eb0e0c0ae25608277')
    expect(user).toEqual(jsonUsers.users[0])
  })

  it('should return a guid when authorizeUser is called', () => {
    const dbCursor = connectDB()
    const { email, password } = jsonUsers.users[0]
    const guid = authorizeUser(dbCursor, {email, password})
    expect(guid).toEqual(jsonUsers.users[0].guid)
  })

  it('should update fields given a partial object when updateUserFields is called', async () => {
    const dbCursor = connectDB()
    const payload = {
      guid: 'eab0324c-75ef-49a1-9c49-be2d68f50b96',
      eyeColor: Math.random().toString(),
      name: {
        last: Math.random().toString()
      }
    }

    const writeResponse = await updateUserFields(dbCursor, payload)
    expect(writeResponse).toEqual({...jsonUsers.users[0], ...payload, name: {...jsonUsers.users[0].name, ...payload.name}})

  })
})