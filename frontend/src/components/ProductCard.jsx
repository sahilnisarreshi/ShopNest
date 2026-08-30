import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/product.css";

const ProductCard = ({ product }) => {
    // Support both old and new database records
    const imageUrl = product.imageUrl || product.image;

    return (
        <div className="product-card">

            <img
                src={imageUrl}
                alt={product.name}
                className="product-image"
                onError={(e) => {
                    console.error("Image failed to load:", imageUrl);
                    e.target.style.display = "none";
                }}
            />

            <div className="product-info">

                <h3 className="product-name">
                    {product.name}
                </h3>

                <p className="product-price">
                    ${Number(product.price).toFixed(2)}
                </p>

                <Link
                    to={`/product/${product._id}`}
                    className="btn"
                >
                    View Details
                </Link>

            </div>
        </div>
    );
};

export default ProductCard;