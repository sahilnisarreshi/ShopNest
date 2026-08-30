import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('stock', formData.stock);

      if (image) {
        data.append('image', image);
      }

      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        body: data
      });

      if (res.ok) {
        alert('Product updated successfully!');
        navigate('/admin/products');
      } else {
        const result = await res.json();
        alert(result.message || 'Failed to update product');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while updating the product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-product-page">

      <div className="edit-product-card">

        <div className="edit-product-header">
          <div>
            <span className="admin-label">ADMIN PANEL</span>
            <h2>Edit Product</h2>
            <p>Update your product information and inventory.</p>
          </div>

          <div className="edit-icon">
            ✎
          </div>
        </div>

        <form onSubmit={handleSubmit} className="edit-product-form">

          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Enter product description"
              required
              rows="5"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value
                })
              }
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Price</label>

              <div className="input-prefix">
                <span>₹</span>

                <input
                  type="number"
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>Stock</label>

              <input
                type="number"
                placeholder="0"
                required
                min="0"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: e.target.value
                  })
                }
              />
            </div>

          </div>

          <div className="form-group">
            <label>Category</label>

            <input
              type="text"
              placeholder="e.g. Electronics"
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value
                })
              }
            />
          </div>

          <div className="image-upload">

            <div className="upload-icon">
              🖼️
            </div>

            <div className="upload-content">
              <label>Replace Product Image</label>

              <p>
                Select a new image if you want to replace the current one.
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
              />

              {image && (
                <span className="selected-file">
                  ✓ {image.name}
                </span>
              )}
            </div>

          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/admin/products')}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="update-btn"
            >
              {loading ? 'Updating...' : 'Update Product →'}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProduct;