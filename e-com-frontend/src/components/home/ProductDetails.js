import { useEffect, useState } from "react";
import Layout from "../Layout";
import { API } from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import { showSuccess, showError } from "../../utils/messages";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import { getProductDetails } from "../../api/apiProduct";
import { addToCart } from "../../api/apiOrder";
import { isAuthenticated, userInfo } from "../../utils/auth";

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
                    //! ?????--------problem-------?????????
                    console.log(err.response);
                    if (err.response) setError(err.response.data);
                    else setError("Adding to cart failed!");
                });
        } else {
            setSuccess(false);
            setError("Please Login First!");
        }
    };

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
            <div className="flex p-5">
                <div className="basis-3/4">
                    <img
                        src={`${API}/product/photo/${product._id}`}
                        alt={product.name}
                        width="100%"
                    />
                </div>
                <div className="px-5 basis-1/4">
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography variant="body1">
                        &#2547;{product.price}
                    </Typography>
                    <p>
                        {product.quantity ? (
                            <span
                                style={{
                                    padding: 5,
                                    backgroundColor: "orange",
                                    borderRadius: 5,
                                    fontWeight: "bold",
                                }}
                            >
                                In Stock
                            </span>
                        ) : (
                            <span>Out of Stock</span>
                        )}
                    </p>
                    {product.quantity ? (
                        <>
                            <Button
                                variant="contained"
                                onClick={handleAddToCart(product)}
                            >
                                Add to Cart
                            </Button>
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
