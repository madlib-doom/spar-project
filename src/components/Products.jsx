import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';
import './css/Product.css'; // Optional: for custom styling

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
    const img_url = "https://rexkinoo.pythonanywhere.com/static/images/";

    // Random stock generator
    const generateRandomStock = () => Math.floor(Math.random() * 51); // 0–50

    // Fetch products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://rexkinoo.pythonanywhere.com/api/getproducts");
            setProducts(response.data);
            setFilteredProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError("An error occurred. Please try again later.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Dynamic search
    useEffect(() => {
        if (!searchTerm) {
            setFilteredProducts(products);
        } else {
            const term = searchTerm.toLowerCase();
            const filtered = products.filter(p =>
                p.product_name.toLowerCase().includes(term) ||
                p.product_description.toLowerCase().includes(term)
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    // Highlight search matches
    const highlightText = (text) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, "gi");
        return text.split(regex).map((part, index) =>
            regex.test(part) ? <span key={index} className="bg-warning">{part}</span> : part
        );
    };

    return (
        <div className="container mt-4">
            {/* Carousel for featured products */}
            {products.length > 0 && (
                <div id="productsCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {products.slice(0, 5).map((p, idx) => (
                            <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
                                <img
                                    src={img_url + p.product_photo}
                                    className="d-block w-100 rounded"
                                    alt={p.product_name}
                                    style={{ height: '300px', objectFit: 'cover' }}
                                />
                                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                                    <h5>{p.product_name}</h5>
                                    <p>{p.product_description.slice(0, 50)}...</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#productsCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#productsCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            )}

            <h1 className="text-success text-center mb-4">Available Engines</h1>

            {/* Google-style search bar */}
            <div className="mb-4 d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control w-50 shadow-sm google-search-bar"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                />
            </div>

            {loading && <Loader />}
            {error && <p className="text-danger text-center">{error}</p>}

            <div className="row">
                {filteredProducts.length === 0 && !loading && (
                    <p className="text-warning text-center">No products found.</p>
                )}

                {filteredProducts.map((product, index) => {
                    const stock = generateRandomStock();
                    return (
                        <div className="col-md-3 mb-4" key={index}>
                            <div className="card shadow h-100">
                                <img
                                    src={img_url + product.product_photo}
                                    alt={product.product_name}
                                    className="card-img-top product-img mt-3"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="text-primary">{highlightText(product.product_name)}</h5>
                                    <p className="text-info">{highlightText(product.product_description.slice(0, 20))}...</p>
                                    <b className="text-danger">Ksh. {product.product_cost}</b>
                                    <p className={stock > 0 ? 'text-success' : 'text-danger'}>
                                        {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                                    </p>
                                    <button
                                        className="btn btn-info mt-2 w-100"
                                        disabled={stock === 0}
                                        onClick={() => navigate('/productdetails', { state: { products: product } })}
                                    >
                                        See more
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Products;
