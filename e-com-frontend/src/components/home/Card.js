import React from "react";
import { Link } from "react-router-dom";
import { API } from "../../utils/config";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import "./card.css";

//! MY CARD ----------------------------
const ProductCard = ({ product, handleAddToCart }) => {
    const titleStyle = {
        display: "block",
        textOverflow: "ellipsis",
        wordWrap: "break-word",
        overflow: "hidden",
        maxHeight: "2em",
        lineHeight: "1em",
    };

    return (
        <div className="mb-10">
            <Card sx={{ maxWidth: 340, maxHeight: 400 }}>
                <img
                    src={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                    className="cardImg"
                />
                {/* <CardMedia
                    sx={{ imgStyle }}
                    image={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                /> */}
                <CardContent>
                    <div style={{ minHeight: "3em" }}>
                        <Typography variant="h5" sx={{ titleStyle }}>
                            {product.name}
                        </Typography>
                    </div>
                    <Typography variant="body2" color="text.secondary">
                        <span>&#2547;</span>
                        {product.price}
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
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={`/product/${product._id}`}>
                        <Button variant="contained" size="small">
                            View Product
                        </Button>
                    </Link>
                    {product.quantity ? (
                        <>
                            &nbsp;
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        </>
                    ) : (
                        ""
                    )}
                </CardActions>
            </Card>
        </div>
    );
};

export default ProductCard;
