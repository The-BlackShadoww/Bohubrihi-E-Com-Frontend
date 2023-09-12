import { useEffect, useState } from "react";
import Layout from "../Layout";
import { API } from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import { showSuccess, showError } from "../../utils/messages";
import { Breadcrumbs, Typography } from "@mui/material";
import { getProductDetails } from "../../api/apiProduct";

const ProductDetails = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // const id = props.match.params.id;
        getProductDetails(id)
            .then((response) => setProduct(response.data))
            .catch((err) => setError("Failed to load products"));
    },[]);

    return (
        <Layout title="Product Page">
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/" underline="hover" color="inherit">
                    Home
                </Link>
                <Link to="#" underline="hover" color="inherit">
                    Product
                </Link>
                <Typography color="text.primary">
                    Home Page Navigation
                </Typography>
            </Breadcrumbs>
            <div>
                {showSuccess(success, "Item Added to Cart!")}
                {showError(error, error)}
            </div>
            <div>
                <div className="">
                    <img
                        src={`${API}/product/photo/${product._id}`}
                        alt={product.name}
                        width="100%"
                    />
                </div>
                <div>
                    <h3>{product.name}</h3>
                    <span style={{ fontSize: 20 }}>&#2547;</span>
                    {product.price}{" "}
                    <p>
                        {product.quantity ? (
                            <span>In Stock</span>
                        ) : (
                            <span>Out of Stock</span>
                        )}
                    </p>
                    {product.quantity ? (
                        <>
                            &nbsp;
                            <button className="btn btn-outline-primary btn-md">
                                Add to Cart
                            </button>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;
