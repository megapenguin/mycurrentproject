const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Instruction = require("../models/Instruction");

router.get("/", (req, res) => {
  //SELECT * FROM users
  Instruction.findAll()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/add_instruction", (req, res) => {
  let { titleId, stepNumber, stepInstruction } = req.body;

  Instruction.create({ titleId, stepNumber, stepInstruction })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/search_instructions", (req, res) => {
  let { value } = req.body;

  Instruction.findAll({
    where: {
      titleId: {
        [Op.like]: value,
      },
    },
  })
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete_driver", (req, res) => {
  let { id } = req.query;

  Driver.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted user" });
    })
    .catch((error) => console.log(error));
});

router.post("/update_instruction", (req, res) => {
  let { id, titleId, stepNumber, stepInstruction } = req.body;

  Instruction.update(
    { titleId, stepNumber, stepInstruction },
    { where: { id } }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete_instruction", (req, res) => {
  let { id } = req.query;

  Instruction.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted instruction title" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
