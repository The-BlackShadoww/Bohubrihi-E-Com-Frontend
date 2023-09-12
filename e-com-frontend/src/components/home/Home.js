import React from "react";
import { useState, useEffect } from "react";
import Layout from "../Layout";
import ProductCard from "./Card";
import { showError, showSuccess } from "../../utils/messages";
import {
    getCategories,
    getProducts,
    getProductDetails,
    getFilteredProducts,
} from "../../api/apiProduct";
import { Typography } from "@mui/material";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "../../utils/prices";

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
            <>
                <div className="">
                    <div className="">
                        <h5>Filter By Categories:</h5>
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
                    </div>
                    <div className="">
                        <h5>Filter By Price:</h5>
                        <div className="">
                            <RadioBox
                                prices={prices}
                                handleFilters={(myfilters) =>
                                    handleFilters(myfilters, "price")
                                }
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <Layout title="Home Page">
            {showFilters()}
            <div style={{ width: "100%" }}>
                {showError(error, error)}
                {showSuccess(success, "Added to cart successfully!")}
            </div>
            <div className="">
                {products &&
                    products.map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
            </div>
        </Layout>
    );
};

export default Home;
