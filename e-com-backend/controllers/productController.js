
const fs = require("fs");
const _ = require("lodash");
const formidable = require("formidable");
const { Product, validate } = require("../models/products");

//! ------------ CREATING PRODUCT -------------
module.exports.createProduct = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log("Form Field", fields); //!--> !!!!!!!!!!!!!!!!!!!!!!
        if (err) return res.status(400).send("Something went wrong");
        const { error } = validate(
            _.pick(fields, [
                "name",
                "description",
                "price",
                "category",
                "quantity",
            ])
        );
        if (error) return res.status(400).send(error.details[0].message);

        const product = new Product(fields);

        if (files.photo) {
            fs.readFile(files.photo.path, (err, data) => {
                if (err)
                    return res.status(400).send("Problem in the file data");
                product.photo.data = data;
                product.photo.contentType = files.photo.type;

                product.save((err, result) => {
                    if (err)
                        return res.status(500).send("Internal Server error");
                    else
                        return res.status(201).send({
                            message: "product created successfully",
                            data: _.pick(result, [
                                "name",
                                "description",
                                "price",
                                "category",
                                "quantity",
                            ]),
                        });
                });
            });
        } else {
            return res.status(400).send("No photo provided");
        }
    });
};

//! --------- CREATING PRODUCT LIST -------------
module.exports.getProducts = async (req, res) => {
    const products = await Product.find().select({ photo: 0 });
    return res.status(200).send(products);
};

module.exports.getProductById = async (req, res) => {};

module.exports.updateProductById = async (req, res) => {};
