const router = require("express").Router();
const Image = require("../models/Image");
const randomString = require("randomstring");
const path = require("path");
const fs = require("fs");

router.get("/search_all_images", (req, res) => {
  Image.findAll()
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/search_images", (req, res) => {
  let { imageOwnerId, imageReferenceId } = req.body;
  Image.findAll({
    where: {
      [Op.and]: [
        {
          imageOwnerId: {
            [Op.like]: imageOwnerId,
          },
        },
        {
          imageReferenceId: {
            [Op.like]: imageReferenceId,
          },
        },
      ],
    },
  })
    .then((_res) => {
      res.json(_res);
      console.log(res);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete_Image", (req, res) => {
  let { id } = req.query;

  Image.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted user" });
    })
    .catch((error) => console.log(error));
});

router.post("/save_image", (req, res) => {
  console.log("save image to db");
  let { imageOwnerId, imageReferenceId, imagePath } = req.body;

  Image.create({ imageOwnerId, imageReferenceId, imagePath })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

//Uploading Images
router.post("/add_image", (req, res) => {
  console.log("Uploading");
  if (req.files === null) {
    return res.status(400).json({ msg: "No image uploaded!" });
  }

  const file = req.files.file;
  const randomFileName = randomString.generate(15);
  const splitFile = file.name.split(".");
  //console.log(file)
  file.mv(
    `${__dirname}/../public/images/${randomFileName}.${splitFile[1]}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: file.name,
        filePath: `${randomFileName}.${splitFile[1]}`,
      });
    }
  );
  // console.log(file.filePath);
});

router.get("/:fileName", (req, res) => {
  let fileName = req.params.fileName;
  console.log(req.params);

  const imagePath = path.resolve("public", "images", fileName);

  if (require("fs").existsSync(imagePath)) {
    res.sendFile(path.resolve("public", "images", fileName));
  } else {
    console.log("ERROR");
  }
});

module.exports = router;
