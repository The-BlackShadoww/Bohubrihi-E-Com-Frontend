// import axios from "axios";
// import { API } from "../utils/config";

// export const addToCart = async (token, cartItem) => {
//     try {
//         const res = await axios.post(`${API}/cart`, cartItem, {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// };

//! ----------v1-------------------
import axios from "axios";
import { API } from "../utils/config";

export const addToCart = (token, cartItem) => {
    return axios
        .post(`${API}/cart`, cartItem, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .catch((error) => {
            console.error("Cart POST Error: ", error.message);
        });
};

export const getCartItems = (token) => {
    return axios.get(`${API}/cart`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateCartItems = (token, cartItem) => {
    console.log(token);
    return axios.put(`${API}/cart`, cartItem, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteCartItem = (token, cartItem) => {
    return axios.delete(`${API}/cart/${cartItem._id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getProfile = (token) => {
    return axios.get(`${API}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateProfile = (token, data) => {
    return axios.post(`${API}/profile`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

//! SSlcommerz Payment

export const initPayment = (token) => {
    return axios.get(`${API}/payment`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
