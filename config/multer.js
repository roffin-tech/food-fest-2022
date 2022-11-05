import multer from "multer";

//method to store image on disks
//images to be stored in uploads
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    const parts = file.originalname.split(".");
    const ext = parts[parts.length - 1];
    cb(null, Date.now() + "." + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
