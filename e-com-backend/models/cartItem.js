const { Schema, model } = require("mongoose");
const joi = require("joi");

const CartItemSchema = Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        price: Number,
        count: {
            type: Number,
            default: 1,
            min: 1,
            max: 5,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // purchased: {
        //     // if purchased true, if not then false.
        // }
    },
    { timestamps: true }
);

module.exports.CartItemSchema = CartItemSchema;
module.exports.CartItem = model("CartItem", CartItemSchema);
