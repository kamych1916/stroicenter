const app = require("express")();

const multer = require("multer");

// const upload = multer({ dest: './static/home/' });
const storage = multer.diskStorage({
  destination: "./static/home/",
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, file.originalname);
  },
});
const upload = multer( { storage: storage } );

app.post("/upload", upload.single("file"), async (req, res) => {
  res.json({ response: "kek" });
});

module.exports = app;
