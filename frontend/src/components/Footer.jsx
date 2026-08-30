import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      style={{
        background: 'rgba(255, 255, 255, 0.78)',
        borderTop: '1px solid rgba(226, 232, 240, 0.9)',
        padding: '45px 25px',
        marginTop: 'auto',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 -10px 35px rgba(15, 23, 42, 0.06)'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '30px'
        }}
      >
        <div>
          <h3
            style={{
              color: '#4f46e5',
              marginBottom: '10px',
              fontSize: '1.5rem',
              fontWeight: '800',
              letterSpacing: '-0.5px'
            }}
          >
            ShopNest
          </h3>

          <p
            style={{
              color: '#64748b',
              fontSize: '0.9rem',
              margin: 0
            }}
          >
            Premium E-Commerce Platform.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '25px',
            flexWrap: 'wrap'
          }}
        >
          <Link
            to="/about"
            style={{
              color: '#475569',
              fontSize: '0.9rem',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#4f46e5';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#475569';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            About Us
          </Link>

          <Link
            to="/return"
            style={{
              color: '#475569',
              fontSize: '0.9rem',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#4f46e5';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#475569';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Return Policy
          </Link>

          <Link
            to="/disclaimer"
            style={{
              color: '#475569',
              fontSize: '0.9rem',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#4f46e5';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#475569';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Disclaimer
          </Link>
        </div>

        <div
          style={{
            color: '#94a3b8',
            fontSize: '0.85rem',
            textAlign: 'right'
          }}
        >
          &copy; {new Date().getFullYear()} ShopNest. All rights reserved.
        </div>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '30px auto 0',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '0.8rem'
        }}
      >
        Built with modern web technologies.
      </div>
    </footer>
  );
};

export default Footer;