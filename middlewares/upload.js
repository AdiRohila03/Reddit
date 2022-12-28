const multer = require('multer');

const u_upload = multer({
    /*  storage: multer.diskStorage({
          //To store file in a folder
          destination: function (req, file, cb) {
              cb(null, "uploads");
          },
          //Name of the File
          filename: function (req, file, cb) {
              cb(null, file.originalname + "_" + Date.now);
              //cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
              //file.fieldname gives name to the image
              //path.extname() returns the extension of a file path
              //file.originalname uses the same name of the file as they were uploaded
          },
      }),*/
    //Size Limit of the file
    limits: { fileSize: 1000000 },     //Size is in bytes 1000000 bytes = 1MB
    //Allows only certain files to be uploaded
    fileFilter: (req, file, cb) => {
        /*
        // Allowed ext
        const filetypes = /jpeg|jpg|png/;

        // Check ext
        const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);

        if(mimetype && extname)
        { cb(null,true); }
        */
        if (file.originalname.match(/\.(jpg|jpeg|png|PNG|JPEG|JPG)/)) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .jpeg, .jpg, .png image format allowed"));
        }
    }
}).single("img");

const p_upload = multer({
    fileFilter: (req, file, cb) => { 
        cb(null, true)    },
    limits: { fileSize: 1000000 }
}).array("posts", 4);
 
module.exports = { u_upload, p_upload }