import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import './css/store.css';

const Toast = ({ toast, onClose }) => {
  if (!toast) return null;
  return (
    <div className={`app-toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`} role="status" aria-live="polite">
      <div className="toast-body">
        <div className="toast-icon">{toast.type === 'success' ? '✔' : '⚠'}</div>
        <div className="toast-content">
          <div className="toast-title">{toast.title}</div>
          <div className="toast-message">{toast.message}</div>
        </div>
        <button className="toast-close" aria-label="Close notification" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

const Store = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");
    const [photo, setPhoto] = useState(null);

    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null); // { type: 'success'|'error', title, message }

    // Auto-hide toast after 5s
    useEffect(() => {
      if (!toast) return;
      const t = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(t);
    }, [toast]);

    const showToast = (type, title, message) => {
      setToast({ type, title, message });
    };

    const submit = async (e) => {
        e.preventDefault();

        // basic client validation
        if (!name.trim() || !description.trim() || !cost || !photo) {
          showToast('error', 'Missing fields', 'Please fill all fields and attach a product photo.');
          return;
        }

        setLoading(true);

        const data = new FormData();
        data.append('product_name', name);
        data.append('product_description', description);
        data.append('product_cost', cost);
        data.append('product_photo', photo);

        try {
            const response = await axios.post("https://rexkinoo.pythonanywhere.com/api/addproduct", data);
            setLoading(false);
            showToast('success', 'Product listed', response?.data?.message || 'Product added successfully.');

            // Reset form
            setName("");
            setDescription("");
            setCost("");
            setPhoto(null);

            // reset file input visually - will require a key on input or use ref; we'll trick by updating a local state key:
            const fileInput = document.getElementById('product-photo-input');
            if (fileInput) fileInput.value = "";
        } catch (err) {
            setLoading(false);
            console.error(err);
            showToast('error', 'Upload failed', 'An error occurred. Please try again later.');
        }
    };

    return (
        <div className="store-page">
            <div className="store-hero">
                <div className="container text-center">
                    <h1 className="store-title">Autmarts Engine Shop</h1>
                    <p className="store-sub">List your high-quality spare parts — engines, pistons, filters and more.</p>
                </div>
            </div>

            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="store-card shadow-sm">
                            <h4 className="mb-3">Sell your spare part</h4>
                            <p className="text-muted mb-4">Fill the form below and attach clear photos. Good photos sell faster!</p>

                            {loading && (
                                <div className="loader-wrap">
                                  <Loader />
                                </div>
                            )}

                            <form onSubmit={submit} className="store-form">
                                <div className="form-group mb-3">
                                    <label className="form-label">Spare part name</label>
                                    <input
                                        type="text"
                                        className="form-control input-ghost"
                                        placeholder="e.g. Toyota 1ZZ-FE Engine"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control input-ghost"
                                        placeholder="Provide a detailed description"
                                        rows="4"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="form-row d-flex gap-3">
                                  <div className="form-group mb-3 flex-grow-1">
                                      <label className="form-label">Price (Ksh)</label>
                                      <input
                                          type="number"
                                          className="form-control input-ghost"
                                          placeholder="e.g. 15000"
                                          required
                                          min="0"
                                          value={cost}
                                          onChange={(e) => setCost(e.target.value)}
                                      />
                                  </div>

                                  <div className="form-group mb-3" style={{ minWidth: 220 }}>
                                      <label className="form-label">Upload photo</label>
                                      <div className="custom-file-wrapper">
                                          <input
                                              id="product-photo-input"
                                              type="file"
                                              className="form-control file-input"
                                              required
                                              accept="image/*"
                                              onChange={(e) => setPhoto(e.target.files[0] || null)}
                                          />
                                          <div className="file-hint">PNG, JPG, JPEG — max 5MB</div>
                                      </div>
                                  </div>
                                </div>

                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" className="btn btn-primary btn-submit">
                                        {loading ? 'Listing...' : 'List Product'}
                                    </button>
                                </div>
                            </form>

                            <div className="store-hint mt-4">
                                <small className="text-muted">Tip: Add multiple clear photos and a precise description to get more buyers.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast position fixed top-right */}
            <div className="toast-portal" aria-live="polite" aria-atomic="true">
              <Toast toast={toast} onClose={() => setToast(null)} />
            </div>
        </div>
    );
};

export default Store;
