const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Jeepney = require("../models/Jeepney");
const JeepneyDriver = require("../models/JeepneyDriver");
const Driver = require("../models/Driver");
const Barangay = require("../models/Barangay");

Jeepney.hasMany(JeepneyDriver, { foreignKey: "jeepneyId" });
JeepneyDriver.belongsTo(Jeepney, { foreignKey: "jeepneyId" });
Driver.hasMany(JeepneyDriver, { foreignKey: "driverId" });
JeepneyDriver.belongsTo(Driver, { foreignKey: "driverId" });
Barangay.hasMany(Jeepney, { foreignKey: "barangayId" });
Jeepney.belongsTo(Barangay, { foreignKey: "barangayId" });
router.get("/", (req, res) => {
  //SELECT * FROM users
  Jeepney.findAll({
    include: [
      {
        model: JeepneyDriver,
        include: [
          {
            model: Driver,
            attributes: { exclude: ["generatePassword"] },
            required: false,
          },
        ],
      },
      {
        model: Barangay,
      },
    ],
  })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/search_jeepneys", (req, res) => {
  let { value } = req.body;

  Jeepney.findAll({
    where: {
      [Op.or]: [
        {
          id: {
            [Op.like]: value,
          },
        },
        {
          barangayId: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          plateNumber: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          jeepCapacity: {
            [Op.like]: "%" + value + "%",
          },
        },
      ],
    },
    include: [
      {
        model: JeepneyDriver,
        include: [
          {
            model: Driver,
            attributes: { exclude: ["generatePassword"] },
            required: false,
          },
        ],
      },
      {
        model: Barangay,
      },
    ],
  })
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
});

router.get("/search_all_jeepneys", (req, res) => {
  //SELECT * FROM users
  Jeepney.findAll()
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/add_jeep", (req, res) => {
  console.log("add to jeep table");
  let { barangayId, plateNumber, jeepCapacity } = req.body;

  Jeepney.create({ barangayId, plateNumber, jeepCapacity })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete_jeep", (req, res) => {
  let { id } = req.query;

  Jeepney.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted jeepney" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
