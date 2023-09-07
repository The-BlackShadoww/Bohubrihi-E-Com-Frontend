const { Schema, model, modelNames } = require("mongoose");
const joi = require("joi");

module.exports.Product = model(
    "Product",
    Schema(
        {
            name: String,
            description: String,
            price: Number,
            category: {
                type: Schema.Types.ObjectId,
                ref: "Category",
                required: true,
            },
            quantity: Number,
            //! ----- *** Important *** ---------
            photo: {
                data: Buffer, //* Buffer means binary. It will convert the photos into binary the will store inside the data property.
                contentType: String, //* The content type of the photo.
            },
        },
        { timestamps: true }
    )
);

module.exports.validate = (product) => {
    const schema = joi.object({
        name: joi.string().min(3).max(255).required(),
        description: joi.string().max(2000).required(),
        price: joi.number().required(),
        quantity: joi.number().required(),
        category: joi.string().required(),
    });
    return schema.validate(product);
};
