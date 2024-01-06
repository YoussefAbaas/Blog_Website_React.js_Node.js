const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = require("express").Router();

//Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const { username, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPass });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json("Wrong credentials");
      return;
    }
    const validated = await bcrypt.compare(password, user.password);
    if (!validated) {
      res.status(400).json("Wrong credentials");
      return;
    }

    const { password: Password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login

module.exports = router;
