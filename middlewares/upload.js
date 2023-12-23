const multer = require('multer');

const u_upload = multer({
    //storage: multer.memoryStorage(),        multer.memoryStorage() is used to store the uploaded files in memory instead of on disk.
    storage: multer.diskStorage({
        destination: 'uploads',
    }),
    limits: { fileSize: 1024 * 1024 * 1 },  //1MB size limit
    filename: (req, file, cb) => {
        cb(null, file.originalname + "_" + Date.now);
    },
    fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|jpeg|png)/)) {
            cb(null, true);
        } else {
            cb(new Error("Only .jpeg, .jpg, .png image format allowed"), false);
        }
    }
}).single("dp");

const p_upload = multer({
    filename: (req, file, cb) => {
        cb(null, file.originalname + "_" + Date.now);
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\.(jpg|jpeg|png|pdf|doc)/)) {
            cb(null, true);
        } else {
            cb(new Error("Only .jpeg, .jpg, .png image format allowed"), false);
        }
    },
    limits: { fileSize: 1024 * 1024 * 1 }
}).array("posts[]", 4);

module.exports = { u_upload, p_upload }