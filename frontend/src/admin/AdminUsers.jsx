import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/auth/users', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    };

    fetchUsers();
  }, [user]);

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>

        <div style={headerStyle}>
          <div>
            <h2 style={titleStyle}>User Directory</h2>
            <p style={subtitleStyle}>
              View all registered users and their account information.
            </p>
          </div>

          <div style={userCountStyle}>
            <span style={userCountNumber}>{users.length}</span>
            <span style={userCountLabel}>Users</span>
          </div>
        </div>

        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>NAME</th>
                <th style={thStyle}>EMAIL</th>
                <th style={thStyle}>ROLE</th>
                <th style={thStyle}>JOINED</th>
              </tr>
            </thead>

            <tbody>
              {users.map(u => (
                <tr
                  key={u._id}
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
                      {u._id.substring(0, 8)}...
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <div style={nameWrapperStyle}>
                      <div style={avatarStyle}>
                        {u.name?.charAt(0).toUpperCase()}
                      </div>

                      <span style={nameStyle}>
                        {u.name}
                      </span>
                    </div>
                  </td>

                  <td style={tdStyle}>
                    <span style={emailStyle}>
                      {u.email}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        ...roleStyle,
                        background:
                          u.role === 'admin'
                            ? '#f0eaff'
                            : '#eafaf4',
                        color:
                          u.role === 'admin'
                            ? '#7c3aed'
                            : '#059669'
                      }}
                    >
                      {u.role.toUpperCase()}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <span style={dateStyle}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div style={emptyStyle}>
              <div style={emptyIconStyle}>👥</div>

              <h3 style={emptyTitleStyle}>
                No Users Found
              </h3>

              <p style={emptyTextStyle}>
                There are currently no registered users.
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

const userCountStyle = {
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

const userCountNumber = {
  color: '#4f46e5',
  fontSize: '1.5rem',
  fontWeight: '700',
  lineHeight: '1'
};

const userCountLabel = {
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
  minWidth: '800px'
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

const nameWrapperStyle = {
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
  background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
  color: '#fff',
  fontSize: '0.9rem',
  fontWeight: '700',
  boxShadow: '0 5px 12px rgba(99, 102, 241, 0.2)'
};

const nameStyle = {
  color: '#25263e',
  fontWeight: '600'
};

const emailStyle = {
  color: '#5f6075'
};

const roleStyle = {
  display: 'inline-block',
  padding: '6px 11px',
  borderRadius: '8px',
  fontSize: '0.75rem',
  fontWeight: '700',
  letterSpacing: '0.3px'
};

const dateStyle = {
  color: '#6f7083'
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

export default AdminUsers;