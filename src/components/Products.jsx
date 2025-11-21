import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';
import './css/Product.css'; // Optional: for custom styling

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("default"); // <-- sort state

    const navigate = useNavigate();
    const img_url = "https://rexkinoo.pythonanywhere.com/static/images/";

    // Random stock generator
    const generateRandomStock = () => Math.floor(Math.random() * 51); // 0–50

    // Fetch products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://rexkinoo.pythonanywhere.com/api/getproducts");
            setProducts(response.data || []);
            setLoading(false);
        } catch (err) {
            setError("An error occurred. Please try again later.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

  
    const costOf = (p) => {
        const c = p?.product_cost;
        const n = Number(c);
        return isNaN(n) ? 0 : n;
    };

    useEffect(() => {
      
        let temp = products.slice(); 
        if (searchTerm && searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            temp = temp.filter(p =>
                (p.product_name || "").toLowerCase().includes(term) ||
                (p.product_description || "").toLowerCase().includes(term)
            );
        }

        
        switch (sortOption) {
            case "price_low":
                temp.sort((a, b) => costOf(a) - costOf(b));
                break;
            case "price_high":
                temp.sort((a, b) => costOf(b) - costOf(a));
                break;
            case "name_asc":
                temp.sort((a, b) => (a.product_name || "").localeCompare(b.product_name || ""));
                break;
            case "name_desc":
                temp.sort((a, b) => (b.product_name || "").localeCompare(a.product_name || ""));
                break;
            default:
                
                break;
        }

        setFilteredProducts(temp);
    }, [products, searchTerm, sortOption]);


    const highlightText = (text) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, "gi");
        return String(text).split(regex).map((part, index) =>
            regex.test(part) ? <span key={index} className="bg-warning">{part}</span> : part
        );
    };

    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    return (
        <div className="container mt-4">
         
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
                                    <p>{(p.product_description || "").slice(0, 10)}...</p>
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

            <div className="mb-4 d-flex align-items-center justify-content-center position-relative">
                <input
                    type="text"
                    className="form-control w-50 shadow-sm google-search-bar"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                />

              
                <div style={{ position: 'absolute', right: 0, top: 0 }}>
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-outline-secondary dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Sort
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <button className={`dropdown-item ${sortOption === 'default' ? 'active' : ''}`} onClick={() => setSortOption('default')}>
                                    Clear Sort
                                </button>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button className={`dropdown-item ${sortOption === 'price_low' ? 'active' : ''}`} onClick={() => setSortOption('price_low')}>
                                    Price: Low → High
                                </button>
                            </li>
                            <li>
                                <button className={`dropdown-item ${sortOption === 'price_high' ? 'active' : ''}`} onClick={() => setSortOption('price_high')}>
                                    Price: High → Low
                                </button>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button className={`dropdown-item ${sortOption === 'name_asc' ? 'active' : ''}`} onClick={() => setSortOption('name_asc')}>
                                    Name: A → Z
                                </button>
                            </li>
                            <li>
                                <button className={`dropdown-item ${sortOption === 'name_desc' ? 'active' : ''}`} onClick={() => setSortOption('name_desc')}>
                                    Name: Z → A
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
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
                        <div className="col-md-3 mb-4" key={product.id ?? index}>
                            <div className="card shadow h-100">
                                <img
                                    src={img_url + product.product_photo}
                                    alt={product.product_name}
                                    className="card-img-top product-img mt-3"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="text-primary">{highlightText(product.product_name)}</h5>
                                    <p className="text-info">{highlightText((product.product_description || "").slice(0, 20))}...</p>
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
