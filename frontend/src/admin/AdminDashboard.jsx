import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate('/login');
          }

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  const pageStyle = {
    minHeight: '85vh',
    padding: '50px 30px',
    background: 'linear-gradient(135deg, #f8f9ff 0%, #eef0ff 50%, #f8f9ff 100%)'
  };

  const wrapperStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    marginBottom: '8px'
  };

  const logoStyle = {
    width: '58px',
    height: '58px',
    borderRadius: '16px',
    objectFit: 'cover',
    boxShadow: '0 10px 25px rgba(79, 70, 229, 0.25)'
  };

  const titleStyle = {
    margin: 0,
    fontSize: '2.6rem',
    fontWeight: '700',
    color: '#17172b',
    letterSpacing: '-1px'
  };

  const welcomeStyle = {
    margin: '0 0 40px 76px',
    color: '#77788c',
    fontSize: '1.05rem'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '35px'
  };

  const cardStyle = {
    position: 'relative',
    padding: '28px',
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(99, 102, 241, 0.12)',
    borderRadius: '20px',
    boxShadow: '0 12px 35px rgba(40, 45, 90, 0.08)',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  };

  const iconBoxStyle = {
    width: '46px',
    height: '46px',
    borderRadius: '13px',
    background: '#eef0ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '21px',
    marginBottom: '20px'
  };

  const labelStyle = {
    margin: '0 0 8px',
    color: '#77788c',
    fontSize: '0.95rem',
    fontWeight: '500'
  };

  const numberStyle = {
    margin: 0,
    color: '#202044',
    fontSize: '2.2rem',
    fontWeight: '700',
    letterSpacing: '-1px'
  };

  const controlsStyle = {
    background: 'rgba(255, 255, 255, 0.92)',
    border: '1px solid rgba(99, 102, 241, 0.12)',
    borderRadius: '22px',
    padding: '35px',
    boxShadow: '0 12px 35px rgba(40, 45, 90, 0.08)'
  };

  const controlsTitleStyle = {
    margin: '0 0 8px',
    color: '#202044',
    fontSize: '1.5rem',
    fontWeight: '700'
  };

  const controlsSubtitleStyle = {
    margin: '0 0 25px',
    color: '#88899b',
    fontSize: '0.95rem'
  };

  const controlsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  };

  const primaryButtonStyle = {
    border: 'none',
    borderRadius: '13px',
    padding: '16px 20px',
    background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
    color: '#fff',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.25)',
    transition: 'all 0.3s ease'
  };

  const secondaryButtonStyle = {
    border: '1px solid #e2e3f0',
    borderRadius: '13px',
    padding: '16px 20px',
    background: '#f8f8fc',
    color: '#35364f',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={pageStyle}>
      <div style={wrapperStyle}>

        <div style={headerStyle}>
          <img
            src="/logo.jpg"
            alt="ShopNest"
            style={logoStyle}
          />

          <h2 style={titleStyle}>
            Admin Dashboard
          </h2>
        </div>

        <p style={welcomeStyle}>
          Welcome back,{' '}
          <strong style={{ color: '#6366f1' }}>
            {user?.name}
          </strong>
        </p>

        {stats ? (
          <div style={statsGridStyle}>

            <div
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow =
                  '0 18px 40px rgba(99, 102, 241, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 12px 35px rgba(40, 45, 90, 0.08)';
              }}
            >
              <div style={iconBoxStyle}>🛍️</div>

              <p style={labelStyle}>
                Total Orders
              </p>

              <h3 style={numberStyle}>
                {stats.totalOrders}
              </h3>
            </div>

            <div
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow =
                  '0 18px 40px rgba(99, 102, 241, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 12px 35px rgba(40, 45, 90, 0.08)';
              }}
            >
              <div style={iconBoxStyle}>📦</div>

              <p style={labelStyle}>
                Total Products
              </p>

              <h3 style={numberStyle}>
                {stats.totalProducts}
              </h3>
            </div>

            <div
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow =
                  '0 18px 40px rgba(99, 102, 241, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 12px 35px rgba(40, 45, 90, 0.08)';
              }}
            >
              <div style={iconBoxStyle}>👥</div>

              <p style={labelStyle}>
                Total Users
              </p>

              <h3 style={numberStyle}>
                {stats.totalUsers}
              </h3>
            </div>

            <div
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow =
                  '0 18px 40px rgba(99, 102, 241, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 12px 35px rgba(40, 45, 90, 0.08)';
              }}
            >
              <div style={iconBoxStyle}>💰</div>

              <p style={labelStyle}>
                Total Revenue
              </p>

              <h3 style={numberStyle}>
                ₹{stats.totalRevenue.toFixed(2)}
              </h3>
            </div>

          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '60px',
              color: '#6366f1',
              fontWeight: '600'
            }}
          >
            Loading metrics...
          </div>
        )}

        <div style={controlsStyle}>

          <h3 style={controlsTitleStyle}>
            Administrative Controls
          </h3>

          <p style={controlsSubtitleStyle}>
            Manage your ShopNest store from one place.
          </p>

          <div style={controlsGridStyle}>

            <button
              style={primaryButtonStyle}
              onClick={() => navigate('/admin/add-product')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 12px 25px rgba(99, 102, 241, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 8px 20px rgba(99, 102, 241, 0.25)';
              }}
            >
              ＋ Add Product
            </button>

            <button
              style={secondaryButtonStyle}
              onClick={() => navigate('/admin/products')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#eef0ff';
                e.currentTarget.style.borderColor = '#c7c9f7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8f8fc';
                e.currentTarget.style.borderColor = '#e2e3f0';
              }}
            >
              📦 Manage Products
            </button>

            <button
              style={secondaryButtonStyle}
              onClick={() => navigate('/admin/orders')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#eef0ff';
                e.currentTarget.style.borderColor = '#c7c9f7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8f8fc';
                e.currentTarget.style.borderColor = '#e2e3f0';
              }}
            >
              🚚 Manage Orders
            </button>

            <button
              style={secondaryButtonStyle}
              onClick={() => navigate('/admin/users')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#eef0ff';
                e.currentTarget.style.borderColor = '#c7c9f7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8f8fc';
                e.currentTarget.style.borderColor = '#e2e3f0';
              }}
            >
              👥 Users Directory
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;