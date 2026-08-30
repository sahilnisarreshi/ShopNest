import React from 'react';

const Disclaimer = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '45px 40px',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '28px',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    boxShadow: '0 20px 60px rgba(15, 23, 42, 0.10)',
    backdropFilter: 'blur(15px)',
    animation: 'pageFade 0.6s ease',
    color: '#334155',
    lineHeight: '1.8'
  };

  const headingStyle = {
    fontSize: '2.5rem',
    color: '#18181b',
    marginBottom: '12px',
    letterSpacing: '-0.5px'
  };

  const subtitleStyle = {
    color: '#64748b',
    fontSize: '1rem',
    marginBottom: '30px'
  };

  const sectionStyle = {
    marginBottom: '28px'
  };

  const sectionHeadingStyle = {
    color: '#4f46e5',
    fontSize: '1.25rem',
    marginBottom: '10px',
    fontWeight: '700'
  };

  const paragraphStyle = {
    color: '#64748b',
    fontSize: '15px',
    lineHeight: '1.8',
    margin: 0
  };

  const dividerStyle = {
    border: 'none',
    borderTop: '1px solid #e2e8f0',
    margin: '30px 0'
  };

  return (
    <div style={containerStyle}>

      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={headingStyle}>
          Legal & Site Disclaimer
        </h2>

        <p style={subtitleStyle}>
          Important information regarding the use of the ShopNest platform.
        </p>
      </div>

      <hr style={dividerStyle} />

      {/* Introduction */}
      <div style={sectionStyle}>
        <p style={paragraphStyle}>
          The data, interfaces, and graphical components represented across
          the ShopNest platform are intended primarily for educational and
          demonstration purposes. This project showcases modern web
          application structures and architectures for portfolio and
          development purposes.
        </p>
      </div>

      {/* Section 1 */}
      <div style={sectionStyle}>
        <h4 style={sectionHeadingStyle}>
          1. Accuracy of Materials
        </h4>

        <p style={paragraphStyle}>
          Materials displayed throughout the ShopNest interface may include
          dynamic content, technical examples, placeholder information, or
          demonstration images. Products available within the application
          may be sample products created for development and testing purposes
          and should not necessarily be considered representations of actual
          physical products.
        </p>
      </div>

      {/* Section 2 */}
      <div style={sectionStyle}>
        <h4 style={sectionHeadingStyle}>
          2. Payment Processing
        </h4>

        <p style={paragraphStyle}>
          Payment functionality within this project is intended for testing
          and demonstration purposes. Where applicable, payment processing
          may be connected to a test or sandbox environment. Users should
          not assume that transactions made through a demonstration
          environment represent real commercial purchases.
        </p>
      </div>

      {/* Section 3 */}
      <div style={sectionStyle}>
        <h4 style={sectionHeadingStyle}>
          3. External Links
        </h4>

        <p style={paragraphStyle}>
          ShopNest may contain links to external websites or third-party
          services. These websites operate independently from ShopNest.
          We are not responsible for the content, availability, privacy
          practices, or behavior of external websites accessed through
          third-party links.
        </p>
      </div>

      {/* Section 4 */}
      <div style={sectionStyle}>
        <h4 style={sectionHeadingStyle}>
          4. Educational Purpose
        </h4>

        <p style={paragraphStyle}>
          ShopNest is designed as an educational e-commerce project to
          demonstrate concepts such as product management, user
          authentication, order management, image hosting, and online
          payment integration.
        </p>
      </div>

      <hr style={dividerStyle} />

      {/* Notice Box */}
      <div
        style={{
          padding: '22px',
          background: '#eef2ff',
          border: '1px solid #c7d2fe',
          borderRadius: '16px',
          textAlign: 'center'
        }}
      >
        <h4
          style={{
            color: '#3730a3',
            marginBottom: '8px',
            fontSize: '1.1rem'
          }}
        >
          Important Notice
        </h4>

        <p
          style={{
            color: '#64748b',
            fontSize: '14px',
            lineHeight: '1.7',
            margin: 0
          }}
        >
          By using this platform, you acknowledge that ShopNest is a
          demonstration project and that certain products, transactions,
          and services may be provided solely for development and testing
          purposes.
        </p>
      </div>

      {/* Footer Note */}
      <p
        style={{
          marginTop: '28px',
          textAlign: 'center',
          color: '#94a3b8',
          fontStyle: 'italic',
          fontSize: '0.9rem'
        }}
      >
        Thank you for visiting ShopNest.
      </p>

    </div>
  );
};

export default Disclaimer;