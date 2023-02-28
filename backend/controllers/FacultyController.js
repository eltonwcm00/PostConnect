import asyncHandler from "express-async-handler";
import Faculty from "../models/Faculty.js";
import generateToken from "../utils/generateFacultyToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public

const facultyLogin = asyncHandler(async (req, res) => {
    const { userNameFac, password } = req.body;
    let error = {}
  
    const userFaculty = await Faculty.findOne({ userNameFac });
  
    if (userFaculty && (await Faculty.matchPassword(password))) {
      res.json({
        _id: userFaculty._id,
        userNameFac: userFaculty.userNameFac, 
        isFaculty: userFaculty.isFaculty,
        token: generateToken(userFaculty._id),
      });
    } 
    // else if(!userFaculty) {
    //   error.userNameFac = "Invalid username or password, please try again!";
    //   return res.status(401).json(error);
    // }
    else {
        res.status(408)
        throw new Error("Invalid User Name or Password");
    }
  });

  //@description     Register new user
//@route           POST /api/users/
//@access          Public
const facultyRegister = asyncHandler(async (req, res) => {
  const { userNameFac, password } = req.body;

  const userExists = await Faculty.findOne({ userNameFac });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const userFaculty = await Faculty.create({
    userNameFac,
    password,
  });

  if (userFaculty) {
    res.status(201).json({
      _id: userFaculty._id,
      userNameFac: userFaculty.userNameFac,
      isFaculty: userFaculty.isFaculty,
      token: generateToken(userFaculty._id),
    });
  } else {
      res.status(400);
      throw new Error("User not found");
  }
});

  export { facultyLogin, facultyRegister};