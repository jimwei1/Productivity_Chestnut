const jwt = require('jsonwebtoken');
const router = require('express').Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
const SECRET = process.env.SECRET;
const User = require('../models/user');

router.post('/', async (req, res) => {
    const body = req.body;
    const user = await User.findOne({
        where: {
            username: body.username
        }
    });
    
    const passwordCorrect = body.password === null 
        ? false 
        : await bcrypt.compare(body.password, user.passwordHash)

    
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'Invalid username or password.'
        });
    }

    const userForToken = {
        username: user.username,
        id: user.id
    };

    const token2 = jwt.sign(userForToken, SECRET);

    res.status(200).send({ token:token2, username: user.username, name: user.name })
});

module.exports = router;