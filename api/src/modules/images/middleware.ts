import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

export const uploadImages = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const imageName = `${uuidv4()}-${file.originalname}`;
      file.path = `uploads/${imageName}`
      cb(null, imageName);
      // cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage })
  return { upload }


}