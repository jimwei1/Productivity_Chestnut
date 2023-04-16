require('dotenv').config();
const express = require('express');
const { connectToDatabase, sequelize } = require('./util/db')
const cors = require('cors');

//IMPORT ROUTERS
const tasksRouter = require('./controllers/tasks');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const blockingRouter = require('./controllers/blocking');


const app = express();
app.use(cors());
sequelize.sync()

  app.use(express.json())
  app.use('/api/tasks', tasksRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/login', loginRouter);
  app.use('/api/blocking', blockingRouter);

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
  