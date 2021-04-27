const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const User = require("../models/User");
const Image = require("../models/Image");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";

User.hasMany(Image, { foreignKey: "imageOwnerId" });
Image.belongsTo(User, { foreignKey: "imageOwnerId" });

router.get("/", (req, res) => {
  //SELECT * FROM users
  User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Image,
        where: { imageReferenceId: 4 },
        required: false,
      },
    ],
  })
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
  let {
    email,
    firstName,
    lastName,
    password,
    profilePicture,
    status,
  } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      if (err) return res.sendStatus(500);

      User.create({
        email,
        firstName,
        lastName,
        password: hash,
        profilePicture,
        status,
      })
        .then((_res) => {
          res.json(_res);
          //console.log(_res)
        })
        .catch((error) => console.log(error));
    });
  });
});

router.post("/search_user", (req, res) => {
  let { value } = req.body;

  User.findAll({
    where: {
      [Op.or]: [
        {
          id: {
            [Op.like]: value,
          },
        },
        {
          firstName: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          lastName: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          email: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          provider: {
            [Op.like]: "%" + value + "%",
          },
        },
      ],
    },
    include: [
      {
        model: Image,
        where: { imageReferenceId: 4 },
        required: false,
      },
    ],
  })
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/search_current_user", (req, res) => {
  let { value } = req.body;

  User.findAll({
    where: {
      id: {
        [Op.like]: value,
      },
    },
  })
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/update_user", (req, res) => {
  let { id, firstName, lastName, email } = req.body;

  User.update({ firstName, lastName, email }, { where: { id } })
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/update_profile_picture", (req, res) => {
  let { id, profilePicture } = req.body;

  User.update({ profilePicture }, { where: { id } })
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
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
