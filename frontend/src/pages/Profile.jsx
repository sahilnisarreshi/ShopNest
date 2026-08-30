import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
            logout();
            navigate('/login');
          }

          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const containerStyle = {
    maxWidth: '1100px',
    margin: '50px auto',
    padding: '0 20px',
    color: '#18181b',
    animation: 'pageFade 0.6s ease'
  };

  const profileCardStyle = {
    background: 'rgba(255, 255, 255, 0.88)',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    borderRadius: '28px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(15, 23, 42, 0.10)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    marginBottom: '40px'
  };

  const avatarStyle = {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.2rem',
    fontWeight: '700',
    color: '#fff',
    boxShadow: '0 10px 30px rgba(79, 70, 229, 0.25)',
    flexShrink: 0
  };

  const infoLabelStyle = {
    color: '#64748b',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '6px',
    fontWeight: '600'
  };

  const infoValueStyle = {
    color: '#18181b',
    fontSize: '1.05rem',
    margin: 0,
    fontWeight: '500'
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    background: '#eef2ff',
    color: '#4f46e5',
    border: '1px solid #c7d2fe',
    padding: '8px 15px',
    borderRadius: '50px',
    fontSize: '0.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const logoutButtonStyle = {
    background: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    padding: '11px 20px',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const orderCardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '25px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(15, 23, 42, 0.06)'
  };

  const orderLabelStyle = {
    color: '#64748b',
    fontSize: '0.8rem',
    marginBottom: '6px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const orderValueStyle = {
    color: '#334155',
    fontSize: '0.95rem'
  };

  const emptyStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px dashed #cbd5e1',
    borderRadius: '20px',
    padding: '55px 25px',
    textAlign: 'center',
    boxShadow: '0 8px 25px rgba(15, 23, 42, 0.05)'
  };

  const getStatusStyle = (status) => {
    if (status === 'Delivered') {
      return {
        background: '#ecfdf5',
        color: '#059669',
        border: '1px solid #a7f3d0'
      };
    }

    if (status === 'Shipped') {
      return {
        background: '#eff6ff',
        color: '#2563eb',
        border: '1px solid #bfdbfe'
      };
    }

    return {
      background: '#fffbeb',
      color: '#d97706',
      border: '1px solid #fde68a'
    };
  };

  if (!user) return null;

  return (
    <div style={containerStyle}>

      {/* PROFILE CARD */}
      <div style={profileCardStyle}>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '25px',
            flexWrap: 'wrap'
          }}
        >

          {/* USER INFO */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '22px'
            }}
          >

            <div style={avatarStyle}>
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : 'U'}
            </div>

            <div>

              <p
                style={{
                  color: '#64748b',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '7px',
                  fontWeight: '600'
                }}
              >
                Account
              </p>

              <h2
                style={{
                  margin: '0 0 10px',
                  color: '#18181b',
                  fontSize: '2.2rem',
                  letterSpacing: '-0.5px'
                }}
              >
                My Profile
              </h2>

              <span style={badgeStyle}>
                <span>●</span>
                {user.role}
              </span>

            </div>

          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            style={logoutButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fee2e2';
              e.currentTarget.style.borderColor = '#fca5a5';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fef2f2';
              e.currentTarget.style.borderColor = '#fecaca';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Logout
          </button>

        </div>

        {/* DIVIDER */}
        <div
          style={{
            height: '1px',
            background: '#e2e8f0',
            margin: '30px 0'
          }}
        />

        {/* ACCOUNT DETAILS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '25px'
          }}
        >

          <div>
            <p style={infoLabelStyle}>Full Name</p>
            <p style={infoValueStyle}>{user.name}</p>
          </div>

          <div>
            <p style={infoLabelStyle}>Email Address</p>
            <p style={infoValueStyle}>{user.email}</p>
          </div>

          <div>
            <p style={infoLabelStyle}>Account Type</p>

            <p style={infoValueStyle}>
              {user.role.charAt(0).toUpperCase() +
                user.role.slice(1)}
            </p>
          </div>

        </div>

      </div>

      {/* ORDER HISTORY */}
      <div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '15px',
            flexWrap: 'wrap'
          }}
        >

          <div>

            <h3
              style={{
                margin: '0 0 5px',
                color: '#18181b',
                fontSize: '1.7rem'
              }}
            >
              Order History
            </h3>

            <p
              style={{
                margin: 0,
                color: '#64748b',
                fontSize: '0.9rem'
              }}
            >
              Track your recent purchases
            </p>

          </div>

          {orders.length > 0 && (
            <span
              style={{
                color: '#64748b',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}
            >
              {orders.length}{' '}
              {orders.length === 1
                ? 'Order'
                : 'Orders'}
            </span>
          )}

        </div>

        {/* LOADING */}
        {loading ? (

          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#4f46e5'
            }}
          >
            <p
              style={{
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Fetching your orders...
            </p>
          </div>

        ) : orders.length === 0 ? (

          /* EMPTY ORDERS */
          <div style={emptyStyle}>

            <div
              style={{
                width: '70px',
                height: '70px',
                margin: '0 auto 20px',
                borderRadius: '50%',
                background: '#eef2ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.7rem'
              }}
            >
              🛒
            </div>

            <h3
              style={{
                color: '#18181b',
                marginBottom: '8px',
                fontSize: '1.3rem'
              }}
            >
              No orders yet
            </h3>

            <p
              style={{
                color: '#64748b',
                marginBottom: '22px'
              }}
            >
              You haven't placed any orders yet.
            </p>

            <Link
              to="/shop"
              className="btn"
            >
              Start Shopping
            </Link>

          </div>

        ) : (

          /* ORDERS */
          <div
            style={{
              display: 'grid',
              gap: '15px'
            }}
          >

            {orders.map(order => (

              <div
                key={order._id}
                style={orderCardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(-4px)';

                  e.currentTarget.style.boxShadow =
                    '0 15px 35px rgba(79, 70, 229, 0.10)';

                  e.currentTarget.style.borderColor =
                    '#c7d2fe';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(0)';

                  e.currentTarget.style.boxShadow =
                    '0 8px 25px rgba(15, 23, 42, 0.06)';

                  e.currentTarget.style.borderColor =
                    '#e2e8f0';
                }}
              >

                <div
                  style={{
                    minWidth: '250px',
                    flex: 1
                  }}
                >

                  {/* ORDER ID */}
                  <p style={orderLabelStyle}>
                    Order ID
                  </p>

                  <p
                    style={{
                      ...orderValueStyle,
                      fontFamily: 'monospace',
                      marginBottom: '18px',
                      wordBreak: 'break-all'
                    }}
                  >
                    {order._id}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '35px'
                    }}
                  >

                    {/* DATE */}
                    <div>

                      <p style={orderLabelStyle}>
                        Placed On
                      </p>

                      <p style={orderValueStyle}>
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    {/* TOTAL */}
                    <div>

                      <p style={orderLabelStyle}>
                        Total
                      </p>

                      <p
                        style={{
                          ...orderValueStyle,
                          color: '#4f46e5',
                          fontWeight: '700',
                          fontSize: '1.1rem'
                        }}
                      >
                        ₹{order.totalAmount.toFixed(2)}
                      </p>

                    </div>

                  </div>

                </div>

                {/* STATUS */}
                <div>

                  <span
                    style={{
                      ...getStatusStyle(order.status),
                      display: 'inline-block',
                      padding: '9px 17px',
                      borderRadius: '50px',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      letterSpacing: '0.3px'
                    }}
                  >
                    {order.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Profile;