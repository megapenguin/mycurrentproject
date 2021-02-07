const router = require("express").Router();

const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";

router.get("/", (req, res) => {
  //SELECT * FROM users
  Admin.findAll({ attributes: { exclude: ["password"] } })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/register_admin", (req, res) => {
  let { id } = req.query;
  let { firstName, lastName, email, password } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      if (err) return res.sendStatus(500);

      Admin.create({
        firstName,
        lastName,
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

module.exports = router;
