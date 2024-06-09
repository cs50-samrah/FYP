const multer = require("multer");
const uploadController = require("express").Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => { cb(null, req.body.filename) }
})

const upload = multer({ storage})

// upload single image it should contain req.body
uploadController.post("/image", upload.single("image"), async (req, res) => {
    try {
        return res.status(200).json({msg :"File uploaded successfully" , filename : req.body.filename , url : `${"/static/"+req.body.filename}`});
    } catch (error) {
        console.error(error);
    }
});
module.exports = uploadController