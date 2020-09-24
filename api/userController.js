const {
  connectDB,
  authorizeUser,
  readUser,
  updateUserFields
} = require('./lowdb')
const dbCursor = connectDB()

module.exports = {
  authController,
  readUserController,
  updateUserFieldsController
}

async function authController(req, res) {
  try {
    const guid = await authorizeUser(dbCursor, req.body)
    res.send({guid})
  } catch (error) {
    res.status(401).send(error)
  }
}

async function readUserController (req, res) {
  if (!req.body.guid) {
    res.status(400).send('readUserController: guid error in request')
    return
  }

  try {
    const userData = await readUser(dbCursor, req.body.guid)

    if (!userData.isActive) {
      res.status(401).send('user deactivated')
      return
    }

    res.json(userData)


  } catch (error) {
    res.status(500).send(error)
  }
}

async function updateUserFieldsController (req, res) {
  console.log('updateUserFields called with: ', {body: req.body})

  try {
    await updateUserFields(dbCursor, req.body)
    res.status(200).send()
  } catch (error) {
    // check for inaccurate guid or key to give 400 error instead
    res.status(500).send(error)
  }
}