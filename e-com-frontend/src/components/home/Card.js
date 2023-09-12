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

const ProductCard = ({ product }) => {
    const titleStyle = {
        display: "block",
        textOverflow: "ellipsis",
        wordWrap: "break-word",
        overflow: "hidden",
        maxHeight: "2em",
        lineHeight: "1em",
    };

    const imgStyle = {
        height: 250,
        objectFit: "cover",
        objectPosition: "0px 0px",
    };

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <img
                    src={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                    style={imgStyle}
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
                            <span>In Stock</span>
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
                            <Button variant="contained" size="small">
                                {" "}
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
