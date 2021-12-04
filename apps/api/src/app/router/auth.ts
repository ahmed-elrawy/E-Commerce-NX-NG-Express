
import { Router } from "express"
import UserModel from "../models/User"
import * as CryptoJS  from 'crypto-js'
import * as dotenv  from 'dotenv'
import * as jwt from 'jsonwebtoken';
import UserSchemaValidation from '../validation/user-validation'
import * as createError from 'http-errors'
const authRouter = Router()
//REGISTER
authRouter.post("/register", async (req,res) => {
  try{
    const {password,...data} = await UserSchemaValidation.validateAsync(req.body)
    const doesExist = await UserModel.findOne({email:data.email})
    if(doesExist)
      throw createError.Conflict(`${data.email} is already been registered`)
    const newUser = new UserModel({
      ...data,
      password: CryptoJS.AES.encrypt(password,process.env.PASS_SEC).toString() 
    
    });
    const savedUser =  await newUser.save();
      res.status(201).json(savedUser)
    } catch (err) {
      err.isJoi && res.status(422).json(err)
      res.status(500).json(err)
  }
});

//LOGIN
authRouter.post("/login", async (req,res) => {
  try{
    const user = await UserModel.collection.findOne({ username: req.body.username});
    !user && res.status(401).json("Wrong credentials!") // if user is rwong send status res  401 

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const password_orignal = hashedPassword.toString(CryptoJS.enc.Utf8)
    password_orignal !== req.body.password && res.status(401).json("Wrong credentials")
   
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SEC,
      {expiresIn: "3d"}
    );

    const {password ,...others} = user
    res.status(200).json({...others, accessToken}) // i sent other becuse i  want send user without password
  } catch (err) {
    res.status(500).json(err)
  }
})

export default authRouter;