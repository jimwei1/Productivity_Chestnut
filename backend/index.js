require('dotenv').config();
const express = require('express');
const { connectToDatabase, sequelize } = require('./util/db')
//NEED TO IMPORT TASKSROUTER
const tasksRouter = require('./controllers/tasks')

const app = express();
sequelize.sync()

  app.use(express.json())
  app.use('/api/tasks', tasksRouter)

//APP USE API/TASKS

//   const main = async () => {
//     try {
//       await sequelize.authenticate()
//       console.log('Connection has been established successfully.')
//       sequelize.close()
//     } catch (error) {
//       console.error('Unable to connect to the database:', error)
//     }
//   }
  
  const PORT = process.env.PORT || 3001

  const start = async() => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
}
start() 
  



//   module.exports = {sequelize, Sequelize}
  