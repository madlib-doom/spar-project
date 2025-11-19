import axios from 'axios';
import React, { useState } from 'react';
import Loader from './Loader';
import './css/store.css'; // Add a CSS file for custom styling

const Store = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");
    const [photo, setPhoto] = useState('');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('product_name', name);
        data.append('product_description', description);
        data.append('product_cost', cost);
        data.append('product_photo', photo);

        try {
            const response = await axios.post("https://rexkinoo.pythonanywhere.com/api/addproduct", data);
            setLoading(false);
            setSuccess(response.data.message);
            setError("");

            // Reset form
            setName("");
            setDescription("");
            setCost("");
            setPhoto("");
        } catch (err) {
            setLoading(false);
            setError("An error occurred. Please try again later.");
            setSuccess("");
        }
    };

    return (
        <div className="store-page bg-light py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="store-title">Welcome to Autmarts Engine Shop</h1>
                    <p className="store-subtitle">List your high-quality spare parts ranging from engine to other car parts!🚙</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm p-5">
                            <h4 className="mb-4 text-primary">Fill in the form below to sell you spare part!</h4>

                            {loading && <Loader />}
                            {success && <div className="alert alert-success">{success}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={submit} className="store-form">
                                <div className="mb-3">
                                    <label className="form-label">Spare part name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter engine or part name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Spare part Description</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Provide a detailed description of your product"
                                        rows="5"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Price (Ksh)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter price in Ksh"
                                        required
                                        value={cost}
                                        onChange={(e) => setCost(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Upload Photo</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        required
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                    />
                                </div>

                                <button type="submit" className="btn btn-success w-100 btn-lg">
                                    List Product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Store;
