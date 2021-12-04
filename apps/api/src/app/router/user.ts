import { Router } from 'express';
import  UserModel from "../models/User";

import * as CryptoJS from 'CryptoJS';
import VerifyToken from './VerifyToken';


const usersRouter = Router();



//UPDATE USER
usersRouter.put("/:id", VerifyToken.verifyTokenAndAuthrization, async(req,res)=> {
  if(req.body.password) {
    console.log(false)

    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try{
    const updatedUser= await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {new: true}
    );
    console.log(updatedUser)

    res.status(200).json(updatedUser)
  }catch(err) {
    res.status(500).json(err)
  }
})

//DELETE
usersRouter.delete("/:id", VerifyToken.verifyTokenAndAuthrization, async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
usersRouter.get("/find/:id", VerifyToken.verifyTokenAndAdmin, async (req, res) => {
  try {
    // const user = await UserModel.findById(req.params.id);
    const  user= await UserModel.findById(req.params.id) 

    console.log(user) // const { password, ...others } = user;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL USER
// localhost:5000/api/users?new=true
//localhost:5000/api/users
usersRouter.get("/", VerifyToken.verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await UserModel.find().sort({ _id: -1 }).limit(5)
      : await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET USER STATS

usersRouter.get("/stats", VerifyToken.verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await UserModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});


export default usersRouter;

// module.exports = router