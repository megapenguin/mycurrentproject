const router = require("express").Router();
const JeepneyDriver = require("../models/JeepneyDriver");

router.get("/search_all_jeepneydrivers", (req, res) => {
  //SELECT * FROM users
  JeepneyDriver.findAll()
    .then((response) => {
      console.log(response);
      res.json(response);
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
  let { id } = req.query;

  JeepneyDriver.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted jeepney" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
