const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";

router.get("/", (req, res) => {
  //SELECT * FROM users
  User.findAll({ attributes: { exclude: ["password"] } })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/login", (req, res) => {
  let { userName, password } = req.body;

  User.findOne({ where: { userName, password } })

    .then((_res) => {
      if (_res) {
        let {
          id,
          firstName,
          lastName,
          userName,
          email,
          password,
        } = _res.dataValues;
        res.json({
          id,
          firstName,
          lastName,
          userName,
          email,
          password,
        });
      } else {
        res.json(_res);
      }

      console.log("user login");
    })
    .catch((error) => console.log(error));
});

router.post("/register", (req, res) => {
  let { id } = req.query;
  let { firstName, lastName, userName, email, password } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      if (err) return res.sendStatus(500);

      User.create({
        firstName,
        lastName,
        userName,
        email,
        password: hash,
      })
        .then((_res) => {
          res.json(_res);
          //console.log(_res)
        })
        .catch((error) => console.log(error));
    });
  });
});

router.delete("/delete_user", (req, res) => {
  let { id } = req.query;

  User.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted User" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
