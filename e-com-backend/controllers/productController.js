const fs = require("fs");
const _ = require("lodash");
const formidable = require("formidable");
const { Product, validate } = require("../models/products");

//! ------------ CREATING PRODUCT ------------- 
module.exports.createProduct = async (req, res) => {
    //* We are not using "req.body" to bring data. Here we are not bringing data in json format, rather we are bringing form data. whenever a form is submitted from frontend by the user, this IncomingForm will accept that form data and store inside the form variable.
    //* parse accepts a request parameter and get all the data of the form inside this request parameter. form.parse(req, ) this req is req of the createProduct function where all the data send from frontend is stored.
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        //! Here fields is an object. Whatever will be set in name field of input, it will become a property of the field object.
        if (err) return res.status(400).send("Something went wrong"); //* formidable validation
        const { error } = validate(
            _.pick(fields, [
                "name",
                "description",
                "price",
                "category",
                "quantity",
            ])
        );
        if (error) return res.status(400), send(error.details[0].message); //* joi validation

        //* After passing all the validation above now we are Creating new product using "fields".
        const product = new Product(fields);

        //* photos / files
        //? Photo will be found in the name field of input. Like if <input type="file" name="photo" /> it will be recognized as photo. It depends on the name field.
        if (files.photo) {
            //* Whatever is get from file path(files.photo.path) will be read as binary.
            //* Here we are setting the data we got from the "files.photo.path" which is accepted by the data parameter into the photo property of the product schema(product.photo.data)
            fs.readFile(files.photo.path, (err, data) => {
                if (err)
                    return res.status(400).send("Problem in the file data");
                product.photo.data = data;
                product.photo.contentType = files.photo.type; //* files.photo.type --> jpg/png

                //* Handling the functions of mongoose by callback function.
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
            return res.status(400).send("No photo provided")
        }
    });
};

module.exports.getProducts = async (req, res) => {};

module.exports.getProductById = async (req, res) => {};

module.exports.updateProductById = async (req, res) => {};
