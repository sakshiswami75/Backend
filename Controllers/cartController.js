const { json } = require("express");
const CartModel = require("../Model/Cart")
 

exports.addToCart=async (req,res,next) => {
    const{productId,quantity}=req.body;
    const userId=req.user.id
    console.log(userId)
    try {
         let cart=await CartModel.findOne({userId});
        if(!cart){
            cart = await CartModel.create({userId,items:[]})
        }  
        const existingCart=cart.items.find((item)=>item.productId.toString()===productId)
        if(existingCart){
            existingCart.quantity+=quantity;
        }
        else{
            cart.items.push({productId,quantity})
        }
        await cart.save();
        res.status(201).json({message:"Cart added"})
    } catch (error) {
        next(error)
    }
    
}

exports.removeCartProduct=async (req,res,next) => {
    const{productId,userId}=req.body;
    try {
        const cart=await CartModel.findOne({userId});
        if(!cart){
            const error=new Error("No product in the cart");
            error.statusCode=400;
            throw error
        }
        cart.items=cart.items.filter((item)=>item.productId.toString()!==productId)
        await cart.save();
        res.status(200).json({message:"Product removed from cart"});
    } catch (error) {
        next(error)
    }
    
}
exports.viewCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await CartModel.findOne({ userId }).populate(
      "items.productId",
      "name price imageUrl"
    );
    if (!cart) return res.status(200).json({ items: [] }); // return empty if no cart

    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

exports.updateCartItemQty = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const cart = await CartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ message: "Quantity updated", cart });
  } catch (err) {
    next(err);
  }
};