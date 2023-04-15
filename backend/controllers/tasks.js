const router = require('express').Router();
const {Task} = require('../models');



router.post('/', async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.json(task);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
})



module.exports = router
