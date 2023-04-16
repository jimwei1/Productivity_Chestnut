const router = require("express").Router();
const { Task, User } = require("../models");
// const jwt = require('jsonwebtoken');
require("dotenv").config();
// const SECRET = process.env.SECRET;
const tokenExtractor = require("../middleware/middleware");

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    const site = await Site.create({
      name: req.body.siteName,
      userId: user.id,
    });

    res.json(site);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
