import React from "react";
import { useState, useEffect } from "react";
import Layout from "../Layout";
import ProductCard from "./Card";
import { showError, showSuccess } from "../../utils/messages";
import {
    getCategories,
    getProducts,
    getFilteredProducts,
} from "../../api/apiProduct";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "../../utils/prices";
import { isAuthenticated, userInfo } from "../../utils/auth";
import { addToCart } from "../../api/apiOrder";
import { Grid, Typography } from "@mui/material";

//! MY HOME ---------------
const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(30);
    const [skip, setSkip] = useState(0);
    const [order, setOrder] = useState("desc");
    const [sortBy, setSortBy] = useState("createdAt");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [filters, setFilters] = useState({
        category: [],
        price: [],
    });

    useEffect(() => {
        getProducts(sortBy, order, limit)
            .then((response) => setProducts(response.data))
            .catch((err) => setError("Failed to load products!"));

        getCategories()
            .then((response) => setCategories(response.data))
            .catch((err) => setError("Failed to load categories!"));
    }, []);

    const handleAddToCart = (product) => () => {
        if (isAuthenticated()) {
            setError(false);
            setSuccess(false);
            const user = userInfo();
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price,
            };
            addToCart(user.token, cartItem)
                .then((reponse) => setSuccess(true))
                .catch((err) => {
                    //! ?????????????? 
                    console.log(err.response);
                    if (err.response) setError(err.response.data);
                    else setError("Adding to cart failed!");
                });
        } else {
            setSuccess(false);
            setError("Please Login First!");
        }
    };

    const handleFilters = (myfilters, filterBy) => {
        const newFilters = { ...filters };
        if (filterBy === "category") {
            newFilters[filterBy] = myfilters;
        }
        if (filterBy === "price") {
            const data = prices;
            let arr = [];
            for (let i in data) {
                if (data[i].id === parseInt(myfilters)) {
                    arr = data[i].arr;
                }
            }
            newFilters[filterBy] = arr;
        }
        setFilters(newFilters);
        getFilteredProducts(skip, limit, newFilters, order, sortBy)
            .then((response) => setProducts(response.data))
            .catch((err) => setError("Failed to load products!"));
    };

    const showFilters = () => {
        return (
            <div className="mb-10">
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h5">
                            Filter By Categories:
                        </Typography>
                        <ul>
                            {/* {JSON.stringify(categories)} */}
                            <CheckBox
                                categories={categories}
                                handleFilters={(myfilters) =>
                                    handleFilters(myfilters, "category")
                                }
                            />
                        </ul>
                        {/* {JSON.stringify(filters)} */}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5">Filter By Price:</Typography>

                        <div className="">
                            <RadioBox
                                prices={prices}
                                handleFilters={(myfilters) =>
                                    handleFilters(myfilters, "price")
                                }
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    };

    return (
        <Layout title="Home Page">
            {showFilters()}
            <div style={{ width: "100%" }}>
                {showError(error, error)}
                {showSuccess(success, "Added to cart")}
            </div>
            <div className="mb-10">
                <Grid
                    container
                    // rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 0 }}
                >
                    {products &&
                        products.map((product) => (
                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                <ProductCard
                                    product={product}
                                    key={product._id}
                                    handleAddToCart={handleAddToCart(product)}
                                />
                            </Grid>
                        ))}
                </Grid>
            </div>
        </Layout>
    );
};

export default Home;
