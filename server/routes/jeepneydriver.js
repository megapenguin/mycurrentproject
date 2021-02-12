const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Driver = require("../models/Driver");
const JeepneyDriver = require("../models/JeepneyDriver");

Driver.hasMany(JeepneyDriver, { foreignKey: "driverId" });
JeepneyDriver.belongsTo(Driver, { foreignKey: "driverId" });

router.get("/search_all_jeepneydrivers", (req, res) => {
  //SELECT * FROM users
  JeepneyDriver.findAll()
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/search_jeepneydrivers", (req, res) => {
  let { value } = req.body;

  JeepneyDriver.findAll({
    where: {
      [Op.or]: [
        {
          jeepneyId: {
            [Op.like]: value,
          },
        },
      ],
    },

    include: [
      {
        model: Driver,
        attributes: { exclude: ["generatePassword"] },
      },
    ],
  })
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/add_jeepney_driver", (req, res) => {
  console.log("add driver to jeepney");
  let { driverId, jeepneyId } = req.body;

  JeepneyDriver.create({ driverId, jeepneyId })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete_jeepney_driver", (req, res) => {
  let { driverId } = req.query;
  console.log(driverId);

  JeepneyDriver.destroy({ where: { driverId: driverId } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted jeepney" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
