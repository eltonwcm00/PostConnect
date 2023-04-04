import multer from 'multer';
 
//Configuration for Multer
const multerStorage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, "./public");
   },
   filename: (req, file, cb) => {
    cb(null, Date.now()+file.originalname) // file name setting
   },
 });

//Upload Setting
let upload = multer({
 storage: multerStorage,
 fileFilter:(req, file, cb)=>{
  if(file.mimetype.split("/")[1] === "pdf"){
      cb(null, true)
  }
  else{
      cb(null, false);
      cb(new Error('"Not a PDF File!!'))
  }
 }
})

export { upload };

