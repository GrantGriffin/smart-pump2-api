const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 8080
const corsOptions =  {
  origin: 'http://localhost:3000'
}
const { connectDB } = require('./lowdb')
const dbCursor = connectDB()
const {
  authController,
  readUserController,
  updateUserFieldsController
} = require('./userController')

app.use(cors(corsOptions))
app.options('*', cors())
app.use(bodyParser.json())


app.get('/health', (req, res) => {
  res.sendStatus(200)
})

app.post('/auth', authController)

app.post('/readUser', readUserController)

app.post('/updateUserFields', updateUserFieldsController)


if (dbCursor.get) {
  app.listen(port, () => {
    console.log(`SMART Pump node server listening at http://localhost:${port}`)
  })
} else {
  throw new Error(
    'there was an error connecting lowdb'
  )
}