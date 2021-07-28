const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

const db = require("./database/database");

require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

db.authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => console.log("The error is " + error));

app.use(fileUpload());

app.use("/api/v1/auths", require("./routes/auth"));
app.use("/api/v1/images", require("./routes/image"));
app.use("/api/v1/users", require("./routes/user"));
app.use("/api/v1/titles", require("./routes/title"));
app.use("/api/v1/instructions", require("./routes/instruction"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("./", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log("Listent at port " + PORT));
