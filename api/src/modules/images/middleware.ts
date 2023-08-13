import multer from "multer";

export const uploadImages = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        // const imageName = uuidv4() + req.file.originalname;
    // req.file.path = `uploads/${imageName}`;
      cb(null, file.originalname);
    },

    // filename: (req, file, cb) => {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //   cb(null, file.fieldname + '-' + uniqueSuffix);
    // },
  });

  const upload = multer({ storage: storage })
  return { upload }


}