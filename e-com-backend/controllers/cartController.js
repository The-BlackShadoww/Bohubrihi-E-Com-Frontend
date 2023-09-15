const _ = require("lodash");
const { CartItem } = require("../models/cartItem");

//! -------------- Creating Cart -------------
module.exports.createCartItem = async (req, res) => {
    try {
        let { price, product } = _.pick(req.body, ["price", "product"]);

        console.log("From CreateCart: ", price, product);
        const item = await CartItem.findOne({
            user: req.user._id,
            product: product,
        });

        if (item) return res.status(400).send("Item already exists in cart!");
        let cartItem = new CartItem({
            price: price,
            product: product,
            user: req.user._id,
        });
        const result = await cartItem.save();
        res.status(201).send({
            message: "Cart added to mongoDB database",
            data: result,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(400).send(err.message);
    }
};

//! -------------- Getting Cart -------------
module.exports.getCartItem = async (req, res) => {
    const cartItems = await CartItem.find({
        user: req.user._id,
    })
        .populate("product", "name")
        .populate("user", "name");
    return res.status(200).send(cartItems);
};

//! -------------- Updating Cart -------------
module.exports.updateCartItem = async (req, res) => {
    console.log("Request body: ", req.body);
    console.log("Id: ", req.body._id);
    console.log("user id: ", req.body.user._id);

    try {
        const { _id, count } = _.pick(req.body, ["_id", "count"]);
        userId = req.body.user._id;
        await CartItem.updateOne({ _id: _id, user: userId }, { count: count });
        return res.status(200).send("Item Updated");
    } catch (err) {
        console.log(err);
    }
};

// module.exports.updateCartItem = async (req, res) => {
//     const { _id, count } = _.pick(req.body, ["count", "_id"]);
//     userId = req.user._id;
//     await CartItem.updateOne({ _id: _id, user: userId }, { count: count });
//     return res.status(200).send("Item Updated");
// };

//! -------------- Deleting Cart -------------
module.exports.deleteCartItem = async (req, res) => {
    try {
        const _id = req.params.id;
        userId = req.user._id;
        await CartItem.deleteOne({ _id: _id, user: userId });
        return res.status(200).send("Item Deleted !!!");
    } catch (err) {
        console.log(err.message);
    }
};

// module.exports.deleteCartItem = async (req, res) => {
//     const _id = req.params.id;
//     userId = req.user._id;
//     await CartItem.deleteOne({ _id: _id, user: userId });
//     return res.status(200).send("Item Deleted !!!");
// };
