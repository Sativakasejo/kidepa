const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { createKenyanID } = require('./idGenerator');

const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());

app.post('/generate-id', upload.single('photo'), async (req, res) => {
    const { name, idNumber, dob } = req.body;
    const photoPath = req.file.path;
    try {
        const idImage = await createKenyanID(name, idNumber, dob, photoPath);
        res.setHeader('Content-Type', 'image/png');
        res.send(idImage);
    } catch (error) {
        res.status(500).send('Error generating ID image');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
