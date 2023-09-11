const fs = require("fs");
const _ = require("lodash");
const formidable = require("formidable");
const { Product, validate } = require("../models/products");

//! ------------ CREATING PRODUCT -------------
module.exports.createProduct = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        // console.log("Form Field", fields);
        if (err) return res.status(400).send("Something went wrong");
        for (key in fields) {
            fields[key] = fields[key][0];
        }
        // console.log(fields);
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
            fs.readFile(files.photo[0].filepath, async (err, data) => {
                if (err)
                    return res.status(400).send("Problem in the file data");
                product.photo.data = data;
                product.photo.contentType = files.photo.type;

                try {
                    const result = await product.save();
                    console.log(result);
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
                } catch (e) {
                    // console.log(e);
                    // console.log(e._message);
                    return res.status(500).send("Internal Server error");
                }
            });
        } else {
            return res.status(400).send("No photo provided");
        }
    });
};

//! --------- CREATING PRODUCT LIST -------------

//* Query String
//* query --> api/product?order=desc&sortBy=name&limit=10
module.exports.getProducts = async (req, res) => {
    // console.log(req.query);
    let order = req.query.order === "desc" ? -1 : 1;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const products = await Product.find()
        .select({ photo: 0, description: 0 })
        .sort({ [sortBy]: order }) //* if you want to use variable as property name write this inside a [].
        .limit(limit)
        // .populate("category");
        .populate("category", "name");
    return res.status(200).send(products);
};
// module.exports.getProducts = async (req, res) => {
//     const products = await Product.find();
//     return res.status(200).send(products);
// };

//!--------------- get product by ID ----------------------
module.exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
        .select({ photo: 0 })
        .populate("category", "name");
    if (!product) res.status(404).send("Not found");
    return res.status(200).send(product);
};

// ! -------------------- Function for getting photos. -------------------------
module.exports.getPhoto = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
        // .select('photo -_id')
        .select({
            photo: 1,
            _id: 0,
        });
    res.set("Content-Type", product.photo.contentType);
    return res.status(200).send(product.photo.data);
};

// ! -------------------- Function for updating product -------------------------

//* Get product by id
//* Collect form data
//* Update provided form field
//* Update photo (If provided)

module.exports.updateProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send("Something went wrong");
        for (key in fields) {
            fields[key] = fields[key][0];
        }
        const updatedFields = _.pick(fields, [
            "name",
            "description",
            "price",
            "category",
            "quantity",
        ]);
        _.assignIn(product, updatedFields);

        if (files.photo) {
            fs.readFile(files.photo[0].path, async (err, data) => {
                if (err) return res.status(400).send("Something went wrong");
                product.photo.data = data;
                product.photo.contentType = files.photo.type;

                try {
                    const result = await product.save();
                    return res.status(201).send({
                        message: "product updated successfully",
                    });
                } catch (e) {
                    return res.status(500).send("Internal Server error");
                }
            });
        } else {
            try {
                const result = product.save();
                return res.status(201).send({
                    message: "product updated successfully",
                });
            } catch (e) {
                return res.status(500).send("Internal Server error");
            }
        }
    });
};

//! --------------- Filter by any fields --------------
// const body = {
//     order: "desc",
//     sortBy: "price",
//     limit: 6,
//     skip: 20,
//     filters: {
//         price: [1000, 2000],
//         category: ["sfjsdf432434kj343", "sklfiej4n444l", "dafjsj453n3"],
//     },
// };

module.exports.filterProducts = async (req, res) => {
    let order = req.body.order === "desc" ? -1 : 1;
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = parseInt(req.body.skip);

    let filters = req.body.filters;
    let args = {};
    for (let key in filters) {
        if (filters[key].length > 0) {
            if (key === "price") {
                //* { price: { $gte:0, $lte: 500 } }
                //* arguments:  { price: { '$gte': 500, '$lte': 1000 } }

                args["price"] = {
                    $gte: filters["price"][0],
                    $lte: filters["price"][1],
                };
                console.log("arguments: ", args);
            }
            if (key === "category") {
                //* category: { $in: [''] }
                //* category: { '$in': [ 'sfjsdf432434kj343', 'sklfiej4n444l', 'dafjsj453n3' ] }

                args["category"] = {
                    $in: filters["category"],
                };
                console.log("Category filtered: ", args);
            }
        }
    }
    const products = await Product.find(args)
        .select({ photo: 0 })
        .populate("category", "name")
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit);
    return res.status(200).send(products);
};
