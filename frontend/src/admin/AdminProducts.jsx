import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you strictly sure you want to delete this?')) {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    }
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>

        <div style={headerStyle}>
          <div>
            <h2 style={titleStyle}>Manage Products</h2>
            <p style={subtitleStyle}>
              View, edit and manage all products in your store.
            </p>
          </div>

          <Link
            to="/admin/add-product"
            style={addButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 10px 25px rgba(99, 102, 241, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0 6px 18px rgba(99, 102, 241, 0.2)';
            }}
          >
            ＋ Add Product
          </Link>
        </div>

        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>PRODUCT</th>
                <th style={thStyle}>PRICE</th>
                <th style={thStyle}>CATEGORY</th>
                <th style={thStyle}>STOCK</th>
                <th style={thStyle}>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  style={rowStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f8f8ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <td style={tdStyle}>
                    <span style={idStyle}>
                      {product._id.substring(0, 8)}...
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <div style={productNameStyle}>
                      {product.name}
                    </div>
                  </td>

                  <td style={tdStyle}>
                    <span style={priceStyle}>
                      ₹{product.price.toFixed(2)}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <span style={categoryStyle}>
                      {product.category}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        ...stockStyle,
                        color:
                          product.stock === 0
                            ? '#dc2626'
                            : product.stock < 10
                            ? '#d97706'
                            : '#059669'
                      }}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <div style={actionContainerStyle}>

                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        style={editBtn}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#4f46e5';
                          e.currentTarget.style.transform =
                            'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#6366f1';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        style={deleteBtn}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#dc2626';
                          e.currentTarget.style.transform =
                            'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#ef4444';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div style={emptyStyle}>
              <div style={emptyIconStyle}>📦</div>
              <h3 style={emptyTitleStyle}>No Products Found</h3>
              <p style={emptyTextStyle}>
                Start by adding your first product to ShopNest.
              </p>

              <Link
                to="/admin/add-product"
                style={emptyButtonStyle}
              >
                ＋ Add Product
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const pageStyle = {
  minHeight: '85vh',
  padding: '50px 30px',
  background:
    'linear-gradient(135deg, #f8f9ff 0%, #eef0ff 50%, #f8f9ff 100%)'
};

const containerStyle = {
  maxWidth: '1250px',
  margin: '0 auto',
  padding: '35px',
  background: 'rgba(255, 255, 255, 0.92)',
  border: '1px solid rgba(99, 102, 241, 0.12)',
  borderRadius: '22px',
  boxShadow: '0 15px 45px rgba(40, 45, 90, 0.08)'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '30px'
};

const titleStyle = {
  margin: 0,
  color: '#202044',
  fontSize: '2.4rem',
  fontWeight: '700',
  letterSpacing: '-1px'
};

const subtitleStyle = {
  margin: '8px 0 0',
  color: '#85869a',
  fontSize: '0.98rem'
};

const addButtonStyle = {
  display: 'inline-block',
  padding: '14px 22px',
  background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
  color: '#fff',
  borderRadius: '12px',
  fontWeight: '600',
  fontSize: '0.95rem',
  textDecoration: 'none',
  boxShadow: '0 6px 18px rgba(99, 102, 241, 0.2)',
  transition: 'all 0.3s ease',
  whiteSpace: 'nowrap'
};

const tableWrapperStyle = {
  width: '100%',
  overflowX: 'auto',
  border: '1px solid #e7e8f2',
  borderRadius: '16px',
  background: '#ffffff'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: '850px'
};

const thStyle = {
  padding: '18px 20px',
  textAlign: 'left',
  color: '#77788c',
  fontSize: '0.78rem',
  fontWeight: '700',
  letterSpacing: '0.6px',
  background: '#f8f8fc',
  borderBottom: '1px solid #e7e8f2'
};

const rowStyle = {
  borderBottom: '1px solid #ececf3',
  transition: 'all 0.2s ease'
};

const tdStyle = {
  padding: '19px 20px',
  textAlign: 'left',
  color: '#303149',
  fontSize: '0.95rem'
};

const idStyle = {
  color: '#8b8ca0',
  fontFamily: 'monospace',
  fontSize: '0.85rem'
};

const productNameStyle = {
  color: '#25263e',
  fontWeight: '600'
};

const priceStyle = {
  color: '#4f46e5',
  fontWeight: '700'
};

const categoryStyle = {
  display: 'inline-block',
  padding: '6px 10px',
  background: '#eef0ff',
  color: '#4f46e5',
  borderRadius: '8px',
  fontSize: '0.82rem',
  fontWeight: '600'
};

const stockStyle = {
  fontWeight: '700'
};

const actionContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const editBtn = {
  display: 'inline-block',
  padding: '8px 14px',
  background: '#6366f1',
  color: '#fff',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontWeight: '600',
  textDecoration: 'none',
  transition: 'all 0.2s ease'
};

const deleteBtn = {
  padding: '8px 14px',
  background: '#ef4444',
  color: '#fff',
  borderRadius: '8px',
  border: 'none',
  fontSize: '0.85rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};

const emptyStyle = {
  textAlign: 'center',
  padding: '70px 20px'
};

const emptyIconStyle = {
  fontSize: '45px',
  marginBottom: '15px'
};

const emptyTitleStyle = {
  margin: '0 0 8px',
  color: '#25263e',
  fontSize: '1.4rem'
};

const emptyTextStyle = {
  margin: '0 0 25px',
  color: '#85869a'
};

const emptyButtonStyle = {
  display: 'inline-block',
  padding: '12px 20px',
  background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
  color: '#fff',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: '600'
};

export default AdminProducts;