const router = require('express').Router();
const {Task, User} = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;


const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      } catch{
        return res.status(401).json({ error: 'token invalid' })
      }
    }  else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
  }
  
  router.post('/', tokenExtractor, async (req, res) => {
    try {
      const user = await User.findByPk(req.decodedToken.id)
      const task = await Task.create({...req.body, userId: user.id, date: new Date()})
      res.json(task)
    } catch(error) {
      return res.status(400).json({ error })
    }
  })
  

// router.post('/', async(req, res) => {
//     try {
//         const task = await Task.create(req.body);
//         res.json(task);
//     } catch(err) {
//         console.log(err);
//         res.status(400).json(err);
//     }
// })



module.exports = router
