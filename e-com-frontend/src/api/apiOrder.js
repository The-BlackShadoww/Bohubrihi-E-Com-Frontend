import axios from "axios";
import { API } from "../utils/config";

export const addToCart = (token, cartItem) => {
    console.log("From apiOrder: ", token, cartItem);

    return axios
        .post(`${API}/cart`, cartItem, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .catch((error) => {
            console.error("Cart POST Error: ", error);
        });
};
