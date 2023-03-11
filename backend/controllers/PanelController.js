import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import Panel from "../models/Panel.js";

const panelLogin = asyncHandler(async (req, res) => {
    const { usernamePanel, password } = req.body;
  
    const userPanel = await Panel.findOne({ usernamePanel });
    const validPass = await bcrypt.compare(password, userPanel.password);
  
    if (userPanel && validPass) {
      res.status(201).json({
        _id: userPanel._id,
        usernamePanel: userPanel.usernamePanel, 
        isPanel: true,
        token: generateToken(userPanel._id),
        successMessage: "Logged in successfully!"
      });
    } 
    else {
      res.status(401).json({message: "Username or Password is incorrect!"});
    }
});

export {panelLogin};