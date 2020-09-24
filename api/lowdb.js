
module.exports = {
  connectDB,
  authorizeUser,
  readUser,
  updateUserFields
}

function connectDB(jsonLocation = './data/users.json') {
  const low = require('lowdb')
  const FileSync = require('lowdb/adapters/FileSync')
  try {
    const adapter = new FileSync(jsonLocation)
    const dbCursor = low(adapter)
  
    return dbCursor
  } catch (error) {
    throw new Error('error connecting db in lowdb.js')
  }
}

function authorizeUser(dbCursor, payload) {
  const user = dbCursor.get('users')
    .find({email: payload.email})
    .value()

    console.log({WTFAUTH: dbCursor.get('users').value})

  console.log('lowdb', {user})
  if (user.password === payload.password) {
    
    return user.guid
  } else {
    throw new Error('Password mismatch')
  }
}

function readUser(dbCursor, guid) {
  return dbCursor.get('users')
    .find({guid})
    .value()
}


/**
 * 
 * @param {object} dbCursor db driver obj
 * @param {object} updateObj object with guid and partial fields to update
 */
async function updateUserFields(dbCursor, updateObj) {

  try {
    const guid = updateObj.guid
    // delete updateObj.guid
    
    // if(updateObj._id) {
    //   delete updateObj._id
    // }

    console.log({updateObj})
    console.log(guid)

    // grabbing current DB state to deal with nesting issues
    const userToUpdate = await dbCursor.get('users')
      .find({guid})
      .value()

      console.log({userToUpdate, updateObj, WTF: dbCursor.get('users').value()})
    return await dbCursor.get('users')
      .find({guid})
      .assign(updateObj)
      .assign({name: {...userToUpdate.name, ...updateObj.name}})
      .write()
    
  } catch (error) {
    console.error('updateUserFields failed', {...updateObj, guid})

    return error
  }
}