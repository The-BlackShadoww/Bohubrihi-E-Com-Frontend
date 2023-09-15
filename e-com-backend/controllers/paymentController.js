// const SSLCommerz = require("ssl-commerz-node");
const SSLCommerz = require("ssl-commerz-node");
const PaymentSession = SSLCommerz.PaymentSession;

const { CartItem } = require("../models/cartItem");
const { Profile } = require("../models/profile");

module.exports.ipn = async (req, res) => {
    console.log(req.body);
};

module.exports.initPayment = async (req, res) => {
    const userId = req.user._id;
    const cartItems = await CartItem.find({ user: userId });
    //todo profile
    const profile = await Profile.findOne({ user: userId });
    const { address1, address2, city, state, postcode, country, phone } =
        profile;

    const total_amount = cartItems
        .map((item) => item.count * item.price)
        .reduce((a, b) => a + b, 0);

    const total_item = cartItems
        .map((item) => item.count)
        .reduce((a, b) => a + b, 0);

    const tran_id =
        "_" + Math.random().toString(36).substr(2, 9) + new Date().getTime();

    //todo init payment session
    const payment = new PaymentSession(
        true,
        process.env.SSLCOMMERZ_STORE_ID,
        process.env.SSLCOMMERZ_STORE_PASSWORD
    );

    //! Set the urls
    payment.setUrls({
        success: "yoursite.com/success",
        fail: "yoursite.com/fail",
        cancel: "yoursite.com/cancel",
        ipn: "yoursite.com/ipn",
    });

    //! Set order details
    payment.setOrderInfo({
        total_amount: total_amount,
        currency: "BDT",
        tran_id: tran_id,
        emi_option: 0,
    });

    //! Set customer info
    payment.setCusInfo({
        name: req.user.name,
        email: req.user.email,
        add1: address1,
        add2: address2,
        city: city,
        state: state,
        postcode: postcode,
        country: country,
        phone: phone,
        fax: phone,
    });

    //! Set shipping info
    payment.setShippingInfo({
        method: "Courier",
        num_item: total_item,
        name: req.user.name,
        add1: address1,
        add2: address2,
        city: city,
        state: state,
        postcode: postcode,
        country: country,
    });

    //! Set Product Profile
    payment.setProductInfo({
        product_name: "Bohubrihi E-com Products",
        product_category: "General",
        product_profile: "general",
    });

    response = await payment.paymentInit();
    return res.status(200).send(response);
};
