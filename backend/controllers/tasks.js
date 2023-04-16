const router = require("express").Router();
const { Task, User } = require("../models");
// const jwt = require('jsonwebtoken');
require("dotenv").config();
// const SECRET = process.env.SECRET;
const tokenExtractor = require("../middleware/middleware");

/** 
 * Route for creating a new task.
 * 
 * @param {string} title - Title of the task.
 * @param {string} description - Description of the task.
 * @param {string} date - Date of the task.
 * @param {string} completed - Completion status of the task.
 * @param {string} userId - User id of the task.
 * 
 * @returns {object} - Returns the created task.
 */
router.post("/", tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        const task = await Task.create({
            ...req.body,
            userId: user.id,
            date: new Date(),
        });
        res.json(task);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.get("/:id", tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        const task = await Task.findByPk(req.params.id);
        if (task.userId === user.id) {
            res.json(task);
        } else {
            res.status(401).json({ error: "unauthorized" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
});


router.get('/forUser', tokenExtractor,  async(req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        const userId = user.id;

        const tasks = await Task.findAll({
            where: {
                userId: userId
            }
        });
        res.json(tasks);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
  })

/**
 * Route changes completion status of a task between
 * true and false.
 */
router.put("/:id/completion", tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        const task = await Task.findByPk(req.params.id);
        if (task.userId === user.id) {
            task.completed = !task.completed;
            await task.save();
            res.json(task);
        } else {
            res.status(401).json({ error: "unauthorized" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
});

// router.post('/', async(req, res) => {
//     try {
//         const task = await Task.create(req.body);
//         res.json(task);
//     } catch(err) {
//         console.log(err);
//         res.status(400).json(err);
//     }
// })

module.exports = router;
