const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Image = require("../models/Image");
const Driver = require("../models/Driver");
const Jeepney = require("../models/Jeepney");
const Barangay = require("../models/Barangay");
const JeepneyDriver = require("../models/JeepneyDriver");

User.hasMany(Image, { foreignKey: "imageOwnerId" });
Image.belongsTo(User, { foreignKey: "imageOwnerId" });

router.post("/", validateToken, (req, res) => {
  let decode = req.decode;

  let token = jwt.sign({ decode }, process.env.PRIVATE_KEY, {
    expiresIn: "15m",
  });

  return res.json({ token, userData: decode });
});

router.post("/auth_driver_login", (req, res) => {
  Driver.hasMany(JeepneyDriver, { foreignKey: "driverId" });
  JeepneyDriver.belongsTo(Driver, { foreignKey: "driverId" });
  Jeepney.hasMany(JeepneyDriver, { foreignKey: "jeepneyId" });
  JeepneyDriver.belongsTo(Jeepney, { foreignKey: "jeepneyId" });
  Barangay.hasMany(Jeepney, { foreignKey: "barangayId" });
  Jeepney.belongsTo(Barangay, { foreignKey: "barangayId" });

  let { email, generatePassword } = req.body;
  console.log("auth part driver");
  Driver.findOne({
    where: { email },
    include: [
      {
        model: JeepneyDriver,
        required: false,
        include: [
          {
            model: Jeepney,
            required: false,
            include: [
              {
                model: Barangay,
              },
            ],
          },
        ],
      },
    ],
  }).then((user) => {
    if (user === null) return res.sendStatus(422);
    // console.log(user)

    bcrypt.compare(generatePassword, user.generatePassword, (err, status) => {
      // console.log(err, status)

      if (status === false) return res.sendStatus(422);
      //dahil kailangan mo ng id sa code mo ipasa narin natin ang id
      myStatus = "driver";

      let userPayload = {
        id: user.id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        address: user.address,
        contactNumber: user.contactNumber,
        email: user.email,
        myStatus,
        assignedJeep: user.jeepneydrivers,
      };
      //console.log(userPayload)
      let token = jwt.sign(userPayload, process.env.PUBLIC_KEY, {
        expiresIn: "8h",
      });
      jwt.verify(token, process.env.PUBLIC_KEY, (error, decode) => {
        if (error) {
          console.log(error);
          return res.sendStatus(403);
        }

        let secureToken = jwt.sign({ decode }, process.env.PRIVATE_KEY, {
          expiresIn: "15m",
          algorithm: "HS256",
        });
        res.json({ token, userData: userPayload, secureToken });
      });
    });
  });
});

// function validateToken(req, res, next) {
//   console.log(req.headers);
//   let authHeader = req.headers["authorization"];

//   if (!authHeader) return res.sendStatus(403);

//   console.log(authHeader);

//   let token = authHeader.split(" ")[1];

//   if (!token) return res.sendStatus(403);

//   jwt.verify(
//     token,
//     process.env.PUBLIC_KEY,
//     { algorithms: ["HS256"] },
//     (error, decode) => {
//       console.log(error);
//       if (error) return res.sendStatus(403);
//       req.decode = decode;
//       next();
//     }
//   );
// }

router.post("/auth_login", (req, res) => {
  let { provider, email, password, firstName, lastName } = req.body;

  // let where = hasProvider ? {where: {email, provider}} : {where: {email}}
  // let where =
  //   provider !== "normal"
  //     ? { where: { email, provider } }
  //     : { where: { email } };
  if (provider != "normal") {
    User.findOne({
      where: { email, provider },
      include: [
        {
          model: Image,
          where: { imageReferenceId: 4 },
          required: false,
        },
      ],
    }).then((user) => {
      console.log("auth part");

      if (user === null) {
        console.log("new user");
        User.create({
          provider,
          firstName,
          lastName,
          email,
          password: "",
        }).then((user) => {
          console.log("created user", user);
          User.findOne({
            where: { email, provider },
            include: [
              {
                model: Image,
                where: { imageReferenceId: 4 },
                required: false,
              },
            ],
          }).then((user) => {
            //console.log("check user", user);
            let userPayload = {
              id: user.id,
              provider: user.provider,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              myStatus: "user",
              image: user.images,
            };
            //console.log(userPayload)
            let token = jwt.sign(userPayload, process.env.PUBLIC_KEY, {
              expiresIn: "8h",
            });
            jwt.verify(token, process.env.PUBLIC_KEY, (error, decode) => {
              if (error) {
                console.log(error);
                return res.sendStatus(403);
              }

              let secureToken = jwt.sign({ decode }, process.env.PRIVATE_KEY, {
                expiresIn: "15m",
                algorithm: "HS256",
              });
              res.json({ token, userData: userPayload, secureToken });
            });
          });
        });
      }

      console.log("check user", user);
      let userPayload = {
        id: user.id,
        provider: user.provider,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        myStatus: "user",
        image: user.images,
      };
      //console.log(userPayload)
      let token = jwt.sign(userPayload, process.env.PUBLIC_KEY, {
        expiresIn: "8h",
      });
      jwt.verify(token, process.env.PUBLIC_KEY, (error, decode) => {
        if (error) {
          console.log(error);
          return res.sendStatus(403);
        }

        let secureToken = jwt.sign({ decode }, process.env.PRIVATE_KEY, {
          expiresIn: "15m",
          algorithm: "HS256",
        });
        res.json({ token, userData: userPayload, secureToken });
      });
    });
  } else {
    User.findOne({
      where: { email },
      include: [
        {
          model: Image,
          where: { imageReferenceId: 4 },
          required: false,
        },
      ],
    }).then((user) => {
      if (user === null) return res.sendStatus(422);
      // console.log(user)

      bcrypt.compare(password, user.password, (err, status) => {
        // console.log(err, status)

        if (status === false) return res.sendStatus(422);
        //dahil kailangan mo ng id sa code mo ipasa narin natin ang id

        let userPayload = {
          id: user.id,
          provider: user.provider,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          myStatus: "user",
          image: user.images,
        };
        //console.log(userPayload)
        let token = jwt.sign(userPayload, process.env.PUBLIC_KEY, {
          expiresIn: "8h",
        });
        jwt.verify(token, process.env.PUBLIC_KEY, (error, decode) => {
          if (error) {
            console.log(error);
            return res.sendStatus(403);
          }

          let secureToken = jwt.sign({ decode }, process.env.PRIVATE_KEY, {
            expiresIn: "15m",
            algorithm: "HS256",
          });
          res.json({ token, userData: userPayload, secureToken });
        });
      });
    });
  }
});

router.post("/auth_admin_login", (req, res) => {
  let { email, password } = req.body;
  console.log("auth part");

  Admin.findOne({ where: { email } }).then((user) => {
    if (user === null) return res.sendStatus(422);
    // console.log(user)

    bcrypt.compare(password, user.password, (err, status) => {
      // console.log(err, status)

      if (status === false) return res.sendStatus(422);
      //dahil kailangan mo ng id sa code mo ipasa narin natin ang id

      let userPayload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        myStatus: "admin",
      };
      //console.log(userPayload)
      let token = jwt.sign(userPayload, process.env.PUBLIC_KEY, {
        expiresIn: "8h",
      });
      jwt.verify(token, process.env.PUBLIC_KEY, (error, decode) => {
        if (error) {
          console.log(error);
          return res.sendStatus(403);
        }

        let secureToken = jwt.sign({ decode }, process.env.PRIVATE_KEY, {
          expiresIn: "15m",
          algorithm: "HS256",
        });
        res.json({ token, userData: userPayload, secureToken });
      });
    });
  });
});

function validateToken(req, res, next) {
  console.log(req.headers);
  let authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(403);

  console.log(authHeader);

  let token = authHeader.split(" ")[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(
    token,
    process.env.PUBLIC_KEY,
    { algorithms: ["HS256"] },
    (error, decode) => {
      console.log(error);
      if (error) return res.sendStatus(403);
      req.decode = decode;
      next();
    }
  );
}

module.exports = router;
