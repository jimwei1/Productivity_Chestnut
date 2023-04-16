const router = require("express").Router();
const { User, Site } = require("../models");
// const jwt = require('jsonwebtoken');
require("dotenv").config();
// const SECRET = process.env.SECRET;
const tokenExtractor = require("../middleware/middleware");

router.post("/", tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        console.log(user)
        console.log(req.body.url)
        const site = await Site.create({
            url: req.body.url,
            userId: user.id,
        });

        res.json(site);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.get("/", tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        console.log(user);

        const userId = user.id;
        console.log(userId);

        const sites = await Site.findAll({
            where: {
                userId: userId
            }
        });

        res.json(sites);
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error });
    }
});


module.exports = router;
