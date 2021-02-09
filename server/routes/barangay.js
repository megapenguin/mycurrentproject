const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Barangay = require("../models/Barangay");
const Jeepney = require("../models/Jeepney");
const Image = require("../models/Image");

Barangay.hasMany(Jeepney, { foreignKey: "barangayId" });
Jeepney.belongsTo(Barangay, { foreignKey: "barangayId" });
Barangay.hasMany(Image, { foreignKey: "imageOwnerId" });
Image.belongsTo(Barangay, { foreignKey: "imageOwnerId" });
Jeepney.hasMany(Image, { foreignKey: "imageOwnerId" });
Image.belongsTo(Jeepney, { foreignKey: "imageOwnerId" });

const JEEP_REF = 3;
const BAR_REF = 1;

router.get("/", (req, res) => {
  Barangay.findAll({
    include: [
      {
        model: Jeepney,
        include: [
          {
            model: Image,
            where: { imageReferenceId: JEEP_REF },
            required: false,
          },
        ],
      },
      {
        model: Image,
        where: { imageReferenceId: BAR_REF },
        required: false,
      },
    ],
  })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.get("/search_all_barangays", (req, res) => {
  Barangay.findAll()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/search_barangays", (req, res) => {
  let { value } = req.body;

  Barangay.findAll({
    where: {
      [Op.or]: [
        {
          id: {
            [Op.like]: value,
          },
        },
        {
          barangayName: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          location: {
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

router.post("/add_barangay", (req, res) => {
  console.log("add to barangay table");
  let { barangayName, location, barangayDescription } = req.body;

  Barangay.create({ barangayName, location, barangayDescription })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete_barangay", (req, res) => {
  let { id } = req.query;

  Barangay.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted Barangay" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
