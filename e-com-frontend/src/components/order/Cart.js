import { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import {
    getCartItems,
    updateCartItems,
    deleteCartItem,
} from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import CartItem from "./CartItem";
import { Button } from "@mui/material";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const loadCart = () => {
        getCartItems(userInfo().token)
            .then((response) => setCartItems(response.data))
            .catch((err) => console.log(err.response));
    };
    useEffect(() => {
        loadCart();
    }, []);

    const increaseItem = (item) => () => {
        if (item.count === 5) return;
        const cartItem = {
            ...item,
            count: item.count + 1,
        };

        updateCartItems(userInfo().token, cartItem)
            .then((response) => loadCart())
            .catch((error) => console.log(error.response));
    };

    const decreaseItem = (item) => () => {
        if (item.count === 1) return;
        const cartItem = {
            ...item,
            count: item.count - 1,
        };

        updateCartItems(userInfo().token, cartItem)
            .then((response) => loadCart())
            .catch((error) => console.log(error.response));
    };

    const getCartTotal = () => {
        const arr = cartItems.map((item) => item.price * item.count);
        console.log(arr);
        const sum = arr.reduce((a, b) => a + b, 0);
        return sum;
    };

    const removeItem = (item) => () => {
        if (!window.confirm("Delete Item?")) return;
        deleteCartItem(userInfo().token, item)
            .then((response) => {
                loadCart();
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <Layout
            title="Your Cart"
            description="Hurry up! Place your order!"
            className="container"
        >
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Order</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        Cart
                    </li>
                </ol>
            </nav>
            <div className="w-full">
                <table className="border w-full">
                    <thead className="border">
                        <tr className="border">
                            <th scope="col" width="15%">
                                #
                            </th>
                            <th className="border" scope="col">
                                Image
                            </th>
                            <th className="border" scope="col">
                                Product Name
                            </th>
                            <th className="border" scope="col">
                                Quantity
                            </th>
                            <th className="border" scope="col" align="right">
                                Price
                            </th>
                            <th scop="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, idx) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                serial={idx + 1}
                                increaseItem={increaseItem(item)}
                                decreaseItem={decreaseItem(item)}
                                removeItem={removeItem(item)}
                            />
                        ))}
                        <tr className="border">
                            <th className="border" scope="row" />
                            <td className="border" colSpan={2}>
                                Total
                            </td>
                            <td className="border" align="right">
                                ৳{getCartTotal()}
                            </td>
                            <td />
                        </tr>
                        <tr>
                            <th scope="row" />
                            <td colSpan={4} className="text-right">
                                <Link to="/">
                                    <Button variant="contained">
                                        Continue Shopping
                                    </Button>
                                </Link>
                                <Link to="/shipping">
                                    <Button variant="contained" color="success">
                                        Proceed To Checkout
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Cart;
