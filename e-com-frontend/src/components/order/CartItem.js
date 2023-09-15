import React from "react";
import { API } from "../../utils/config";
import { Button } from "@mui/material";

const CartItem = ({ item, serial, increaseItem, decreaseItem, removeItem }) => {
    return (
        <tr className="border">
            <th scope="row">{serial}</th>
            <th>
                <img
                    //* We Populated when we created each cartItem.
                    src={`${API}/product/photo/${item.product._id}`}
                    alt={item.product.name}
                    width="120px"
                />
            </th>
            <td className="border">{item.product ? item.product.name : ""}</td>
            <td className="border">
                <Button variant="outlined" onClick={decreaseItem}>
                    -
                </Button>
                &nbsp;&nbsp;{item.count}&nbsp;&nbsp;
                <Button variant="outlined" onClick={increaseItem}>
                    +
                </Button>
                {/* <button onClick={increaseItem}>+</button> */}
            </td>
            <td className="border" align="right">
                ৳ {item.price * item.count}
            </td>
            <td className="border">
                <Button variant="contained" color="error" onClick={removeItem}>
                    Remove From Cart
                </Button>
            </td>
        </tr>
    );
};

export default CartItem;
