const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

function checkFileType(file, cb) {
    const filetypes = /mp4|pdf|jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Also accommodate application/pdf, video/mp4, image/jpeg, etc.
    if (extname) {
        return cb(null, true);
    } else {
        cb('Files of this type are not supported!');
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 500000000 }, // 500MB max 
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `http://localhost:5001/uploads/${req.file.filename}`;
    res.json({ message: 'File Uploaded', fileUrl });
});

module.exports = router;
