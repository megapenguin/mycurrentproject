const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Title = require("../models/Title");
const Instruction = require("../models/Instruction");

router.get("/", (req, res) => {
  //SELECT * FROM users
  Title.findAll()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/add_title", (req, res) => {
  let { userId, title } = req.body;

  Title.create({ userId, title })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/search_titles", (req, res) => {
  let { value } = req.body;

  Title.findAll({
    where: {
      userId: {
        [Op.like]: value,
      },
    },
  })
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/title", (req, res) => {
  let { value } = req.body;

  Title.findAll({
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
router.delete("/delete_title", (req, res) => {
  let { id } = req.query;

  Title.destroy({ where: { id } })
    .then((response) => {
      Instruction.destroy({
        where: {
          titleId: {
            [Op.like]: id,
          },
        },
      });
      res.json({ success: true, msg: "Succefully deleted instructions" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
