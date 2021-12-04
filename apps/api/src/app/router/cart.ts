import { Router } from 'express';
import  Cart from "../models/Cart";

import VerifyToken from './VerifyToken';

const cartRouter = Router();

//CREATE 
cartRouter.post('/', async (req,res)=> {
  const newCart = new Cart(req.body);
  console.log(newCart)
  try{
   const savedCart =  await newCart.save();
   res.status(200).json(savedCart)
  }catch (err) {
    res.status(500).json(err)
  } 
})

//UPDATE CURT
cartRouter.put("/:id", VerifyToken.verifyTokenAndAuthrization, async(req,res)=> {


  try{
    const updatedCart= await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {new: true}
    );
    console.log(updatedCart)

    res.status(200).json(updatedCart)
  }catch(err) {
    res.status(500).json(err)
  }
})

//DELETE
cartRouter.delete("/:id", VerifyToken.verifyTokenAndAuthrization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
cartRouter.get("/find/:id", VerifyToken.verifyTokenAndAdmin, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
  
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL USER
// localhost:5000/api/users?new=true
//localhost:5000/api/users
cartRouter.get("/", VerifyToken.verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const carts = query
      ? await Cart.find().sort({ _id: -1 }).limit(5)
      : await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default cartRouter;

// module.exports = router