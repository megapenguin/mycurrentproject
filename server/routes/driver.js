const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";
const Driver = require("../models/Driver");
const Jeepney = require("../models/Jeepney");
const JeepneyDriver = require("../models/JeepneyDriver");
const Image = require("../models/Image");

router.get("/", (req, res) => {
  Driver.hasMany(JeepneyDriver, { foreignKey: "driverId" });
  JeepneyDriver.belongsTo(Driver, { foreignKey: "driverId" });
  Jeepney.hasMany(JeepneyDriver, { foreignKey: "jeepneyId" });
  JeepneyDriver.belongsTo(Jeepney, { foreignKey: "jeepneyId" });

  Driver.findAll({
    attributes: {
      exclude: ["generatePassword"],
    },
    include: [
      {
        model: JeepneyDriver,
        include: [{ model: Jeepney }],
      },
    ],
  })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.get("/search_all_drivers", (req, res) => {
  //SELECT * FROM users
  Driver.findAll({ exclude: ["generatePassword"] })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/search_drivers", (req, res) => {
  let { value } = req.body;

  Driver.findAll({
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
          middleName: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          lastName: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          contactNumber: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          address: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          email: {
            [Op.like]: "%" + value + "%",
          },
        },
      ],
    },
  })
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
});

//localhost:8080/users/add
router.post("/add_driver", (req, res) => {
  console.log("add to db");
  let {
    firstName,
    middleName,
    lastName,
    address,
    contactNumber,
    generatePassword,
    email,
  } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(generatePassword, salt, function (err, hash) {
      // Store hash in your password DB.
      if (err) return res.sendStatus(500);

      Driver.create({
        firstName,
        middleName,
        lastName,
        address,
        contactNumber,
        generatePassword: hash,
        email,
      })
        .then((_res) => {
          res.json(_res);
          //console.log(_res)
        })
        .catch((error) => console.log(error));
    });
  });
});

router.delete("/delete_driver", (req, res) => {
  let { id } = req.query;

  Driver.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted user" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
