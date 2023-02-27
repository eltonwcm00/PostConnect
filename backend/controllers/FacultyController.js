import asyncHandler from "express-async-handler";
import Faculty from "../models/Faculty.js";
import generateToken from "../utils/generateFacultyToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public

const facultyLogin = asyncHandler(async (req, res) => {
    const { userNameFac, password } = req.body;
  
    const userFaculty = await Faculty.findOne({ userNameFac });
  
    if (userFaculty && (await Faculty.matchPassword(password))) {
      res.json({
        _id: userFaculty._id,
        userNameFac: userFaculty.userNameFac, 
        isFaculty: userFaculty.isFaculty,
        token: generateToken(userFaculty._id),
      });
    } else {
      res.status(401);
        throw new Error("Invalid User Name or Password");
    }
  });

  export { facultyLogin };