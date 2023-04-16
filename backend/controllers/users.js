const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.get('/', async(req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
})

router.post('/', async (req, res) => {
    const user = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(user.password, saltRounds);
    
    // const user = new User({
    //     username,
    //     name,
    //     passwordHash,
    //     phone
    // });

    const savedUser = await User.create(
        {
        username: user.username, 
        name: user.name, 
        passwordHash: passwordHash,
        phone: user.phone
    }
        );

    res.json(savedUser);
  });
  
  router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).end()
    }
  })
  
  module.exports = router
  