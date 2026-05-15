const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(), // This will store the uploaded file in memory as a buffer
    limits: {
        filesize: 3 * 1024 * 1024 // 3MB file size limit
    }
})

module.exports = upload