const app = require("express")();

const multer = require("multer");

// const upload = multer({ dest: './static/home/' });
const storage = multer.diskStorage({
  destination: "./static/home/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer( { storage: storage } );

app.post("/upload", upload.single("file"), async (req, res) => {
  res.json({ response: "kek" });
});

module.exports = app;
