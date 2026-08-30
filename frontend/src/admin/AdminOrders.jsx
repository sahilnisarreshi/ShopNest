import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ status })
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === id
              ? { ...order, status }
              : order
          )
        );
      } else {
        alert(data.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Unable to update order status');
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'delivered') {
      return {
        background: '#eafaf4',
        color: '#059669',
        border: '1px solid #bcebd8'
      };
    }

    if (status === 'shipped') {
      return {
        background: '#eef2ff',
        color: '#4f46e5',
        border: '1px solid #d8ddff'
      };
    }

    if (status === 'paid') {
      return {
        background: '#f5f3ff',
        color: '#7c3aed',
        border: '1px solid #ddd6fe'
      };
    }

    return {
      background: '#fff7ed',
      color: '#ea580c',
      border: '1px solid #fed7aa'
    };
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>

        <div style={headerStyle}>
          <div>
            <h2 style={titleStyle}>
              Manage Orders
            </h2>

            <p style={subtitleStyle}>
              Track orders and update their delivery status.
            </p>
          </div>

          <div style={orderCountStyle}>
            <span style={orderCountNumber}>
              {orders.length}
            </span>

            <span style={orderCountLabel}>
              Orders
            </span>
          </div>
        </div>

        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ORDER ID</th>
                <th style={thStyle}>USER</th>
                <th style={thStyle}>TOTAL</th>
                <th style={thStyle}>DATE</th>
                <th style={thStyle}>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (
                <tr
                  key={order._id}
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
                      {order._id.substring(0, 8)}...
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <div style={userWrapperStyle}>
                      <div style={avatarStyle}>
                        {order.user?.name
                          ?.charAt(0)
                          .toUpperCase() || 'D'}
                      </div>

                      <span style={userNameStyle}>
                        {order.user?.name || 'Deleted User'}
                      </span>
                    </div>
                  </td>

                  <td style={tdStyle}>
                    <span style={amountStyle}>
                      ₹{Number(order.totalAmount || 0).toFixed(2)}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <span style={dateStyle}>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      style={{
                        ...selectStyle,
                        ...getStatusStyle(order.status)
                      }}
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="paid">
                        Paid
                      </option>

                      <option value="shipped">
                        Shipped
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div style={emptyStyle}>
              <div style={emptyIconStyle}>
                📦
              </div>

              <h3 style={emptyTitleStyle}>
                No Orders Found
              </h3>

              <p style={emptyTextStyle}>
                There are currently no orders to display.
              </p>
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
  boxShadow:
    '0 15px 45px rgba(40, 45, 90, 0.08)'
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

const orderCountStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '90px',
  padding: '12px 18px',
  background: '#f1f2ff',
  border: '1px solid #e1e3ff',
  borderRadius: '14px'
};

const orderCountNumber = {
  color: '#4f46e5',
  fontSize: '1.5rem',
  fontWeight: '700',
  lineHeight: '1'
};

const orderCountLabel = {
  marginTop: '5px',
  color: '#85869a',
  fontSize: '0.75rem',
  fontWeight: '500'
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

const userWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
};

const avatarStyle = {
  width: '38px',
  height: '38px',
  borderRadius: '11px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'linear-gradient(135deg, #6366f1, #7c3aed)',
  color: '#fff',
  fontSize: '0.9rem',
  fontWeight: '700',
  boxShadow:
    '0 5px 12px rgba(99, 102, 241, 0.2)'
};

const userNameStyle = {
  color: '#25263e',
  fontWeight: '600'
};

const amountStyle = {
  color: '#4f46e5',
  fontWeight: '700'
};

const dateStyle = {
  color: '#6f7083'
};

const selectStyle = {
  padding: '8px 32px 8px 11px',
  borderRadius: '9px',
  fontSize: '0.85rem',
  fontWeight: '600',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'auto'
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
  margin: 0,
  color: '#85869a'
};

export default AdminOrders;