import asyncHandler from "express-async-handler";
import Faculty from "../models/Faculty.js";
import generateToken from "../utils/generateFacultyToken.js";
import bcrypt from "bcryptjs";

const facultyRegister = asyncHandler(async (req, res) => {
  
  const { userNameFac, password } = req.body;
  const userExists = await Faculty.findOne({ userNameFac });

  if (userExists) {
    res.status(401).json({message: "Username is existed!"});
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userFaculty = await Faculty.create({
    userNameFac,
    password: hashedPassword,
  });

  if (userFaculty) {

    res.status(201).json({
      _id: userFaculty._id,
      userNameFac: userFaculty.userNameFac,
      isFaculty: true,
      token: generateToken(userFaculty._id),
      successMessage: "Register successfully!"
    });
    
  } else {
      res.status(500);
      throw new Error("Internal server error");
  }
});

const facultyLogin = asyncHandler(async (req, res) => {
  
    // username: admin; password: 123
    const { password } = req.body;
  
    const userFaculty = await Faculty.findOne({ userNameFac:'admin' });
    const validPass = await bcrypt.compare(password, userFaculty.password);
  
    if (userFaculty && validPass) {
      res.status(201).json({
        _id: userFaculty._id,
        userNameFac: userFaculty.userNameFac, 
        isFaculty: true,
        token: generateToken(userFaculty._id),
        successMessage: "Logged in successfully!"
      });
    } 

    else {
      res.status(401).json({message: "Username or Password is incorrect!"});
    }
  });

  export { facultyLogin, facultyRegister};