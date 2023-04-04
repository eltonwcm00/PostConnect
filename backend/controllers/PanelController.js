import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import moment from 'moment';
import Panel from "../models/Panel.js";
import RPD from "../models/RPD.js";

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

const panelReadRPD = asyncHandler(async (req, res) => {
  
  const RPDList = await RPD.find();

  if(RPDList) {
    res.json(RPDList);
  } 
  else {
    res.status(401).json({errorRPDList: "No RPD is ready to be evaluate"});
  }
})

const panelReadRPDByID = asyncHandler(async (req, res) => {

  const fetchRPDID = await RPD.findById(req.params.id);

  if (fetchRPDID) {
    res.status(201).json(fetchRPDID);
  }
  else {
    // res.status(401).json("Today date is greater than the schedule date. The RPD is not ready to be evaluate yet");
    res.status(401).json({message: "Error in .db reference"});
  }
})

export {panelLogin, panelReadRPD, panelReadRPDByID};
