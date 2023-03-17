import multer from 'multer';
 
//Configuration for Multer
const multerStorage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, "public");
   },
   filename: (req, file, cb) => {
     const ext = file.mimetype.split("/")[1];
     cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
   },
 });

// Multer Filter
const multerFilter = (req, file, cb) => {
   if (file.mimetype.split("/")[1] === "pdf") {
     cb(null, true);
   } else {
     cb(new Error("Not a PDF File!!"), false);
   }
 };

 //Calling the "multer" Function
const upload = multer({
   storage: multerStorage,
   fileFilter: multerFilter,
 });

export {upload };