import React, { useState, useEffect } from "react";
import { getCartItems, getProfile } from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { Button, Card, CardContent } from "@mui/material";

const Checkout = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [values, setValues] = useState({
        phone: "",
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        country: "",
    });

    const { phone, address1, address2, city, postcode, country } = values;

    const loadCart = () => {
        getCartItems(userInfo().token)
            .then((response) => setOrderItems(response.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getProfile(userInfo().token)
            .then((response) => setValues(response.data))
            .catch((err) => {});
        loadCart();
    }, []);

    const getOrderTotal = () => {
        const arr = orderItems.map(
            (cartItem) => cartItem.price * cartItem.count
        );
        const sum = arr.reduce((a, b) => a + b, 0);
        return sum;
    };

    const shippingDetails = () => (
        <>
            To,
            <br /> <b>{userInfo().name}</b>
            <br /> Phone: {phone}
            <br /> {address1}
            {address2 ? (
                <>
                    <br />
                    {address2}
                </>
            ) : (
                ""
            )}
            <br /> {city}-{postcode}, {country}
        </>
    );

    if (phone && address1 && address2 && postcode && country)
        return (
            <>
                <Layout title="Checkout" description="Complete your order!">
                    <nav>
                        <ol className="flex">
                            <li>
                                <Link to="/">
                                    <Button variant="text">Order</Button>/
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart">
                                    <Button variant="text">Cart</Button>/
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping">
                                    <Button variant="text">
                                        Shipping Address
                                    </Button>
                                </Link>
                            </li>
                        </ol>
                    </nav>
                    <Card>
                        <CardContent>
                            <div className="flex justify-between">
                                <div className="w-full basis-3/5">
                                    <div style={{ height: "auto" }}>
                                        <div className="border w-full p-4 font-bold mb-4">
                                            Shipping Details
                                        </div>
                                        <div className="card-body">
                                            {shippingDetails()}
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-2/5 p-4">
                                    <div style={{ height: "auto" }}>
                                        <div className="mb-8">
                                            <ul className="list-group list-group-flush">
                                                {orderItems.map((item) => (
                                                    <li
                                                        key={item._id}
                                                        className="list-group-item"
                                                        align="right"
                                                    >
                                                        {item.product
                                                            ? item.product.name
                                                            : ""}{" "}
                                                        x {item.count} = ৳{" "}
                                                        {item.price *
                                                            item.count}{" "}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div
                                            className="flex justify-between"
                                            style={{
                                                backgroundColor: "#fffff9",
                                            }}
                                        >
                                            <span className="float-left">
                                                <b>Order Total</b>
                                            </span>
                                            <span className="float-right">
                                                <b>৳ {getOrderTotal()}</b>
                                            </span>
                                        </div>
                                    </div>
                                    <br />

                                    <Link to="/payment">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="warning"
                                        >
                                            Make Payment
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Layout>
            </>
        );
    else return <></>;
};

export default Checkout;
