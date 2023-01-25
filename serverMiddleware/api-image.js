const app = require('express')()

const multer = require('multer')

const upload = multer({ dest: './static/home/' });

app.post('/upload', upload.single('file'), async (req, res) => {
    res.json({response: 'kek'});
});

module.exports = app