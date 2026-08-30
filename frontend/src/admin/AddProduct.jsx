import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
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

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return alert('Please select an image');
    }

    setLoading(true);

    const data = new FormData();

    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        body: data
      });

      const responseData = await res.json();

      if (res.ok) {
        alert('Product created successfully!');
        navigate('/shop');
      } else {
        alert(responseData.message || 'Error creating product');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while creating the product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '720px',
        margin: '50px auto',
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.88)',
        borderRadius: '28px',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 20px 60px rgba(15, 23, 42, 0.10)',
        backdropFilter: 'blur(15px)'
      }}
    >
      <div style={{ marginBottom: '30px' }}>
        <h2
          style={{
            color: '#18181b',
            fontSize: '2.3rem',
            marginBottom: '8px'
          }}
        >
          Add New Product
        </h2>

        <p
          style={{
            color: '#64748b',
            fontSize: '15px'
          }}
        >
          Add a new product to your ShopNest store.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        <div>
          <label style={labelStyle}>Product Name</label>

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
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Description</label>

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
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: '120px'
            }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '18px'
          }}
        >
          <div>
            <label style={labelStyle}>Price</label>

            <input
              type="number"
              placeholder="₹ Price"
              required
              min="0"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value
                })
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Stock</label>

            <input
              type="number"
              placeholder="Stock quantity"
              required
              min="0"
              value={formData.stock}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stock: e.target.value
                })
              }
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Category</label>

          <input
            type="text"
            placeholder="e.g. Electronics, Fashion"
            required
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value
              })
            }
            style={inputStyle}
          />
        </div>

        <div
          style={{
            padding: '22px',
            borderRadius: '16px',
            border: '2px dashed #c7d2fe',
            background: '#f8fafc',
            marginTop: '5px'
          }}
        >
          <label
            style={{
              display: 'block',
              color: '#334155',
              fontWeight: '600',
              marginBottom: '10px'
            }}
          >
            Product Image
          </label>

          <p
            style={{
              color: '#64748b',
              fontSize: '14px',
              marginBottom: '15px'
            }}
          >
            Select an image to upload to Cloudinary.
          </p>

          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImage(e.target.files[0])}
            style={{
              width: '100%',
              color: '#334155',
              fontSize: '14px'
            }}
          />

          {image && (
            <p
              style={{
                marginTop: '12px',
                color: '#4f46e5',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Selected: {image.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn"
          style={{
            width: '100%',
            marginTop: '8px',
            padding: '15px'
          }}
        >
          {loading ? 'Uploading & Creating...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: '#334155',
  fontSize: '14px',
  fontWeight: '600'
};

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  color: '#18181b',
  fontSize: '15px',
  outline: 'none',
  transition: '0.25s ease'
};

export default AddProduct;