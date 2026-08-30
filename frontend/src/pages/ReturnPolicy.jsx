import React from 'react';

const ReturnPolicy = () => {
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
          Return & Refund Policy
        </h2>

        <p style={subtitleStyle}>
          Please review our return and refund guidelines before initiating a return.
        </p>
      </div>

      <hr style={dividerStyle} />

      {/* Introduction */}
      <div style={sectionStyle}>
        <p style={paragraphStyle}>
          At ShopNest, we proudly stand behind the quality of our merchandise.
          If for any reason you are dissatisfied with your purchase, you may
          initiate a return within 30 days of receiving your order.
        </p>
      </div>

      {/* Section 1 */}
      <div style={sectionStyle}>
        <h4 style={sectionHeadingStyle}>
          1. Eligibility for Returns
        </h4>

        <p style={paragraphStyle}>
          To be eligible for a return, the item must be unused, in the same
          condition that it was received, and maintained in its original
          packaging. A receipt or proof of purchase is required when
          requesting a return.
        </p>
      </div>

      {/* Section 2 */}
      <div style={sectionStyle}>
        <h4 style={sectionHeadingStyle}>
          2. Refund Processing
        </h4>

        <p style={paragraphStyle}>
          Once your returned item is received and inspected, you will be
          notified about the approval or rejection of your refund. Approved
          refunds will be processed through the original payment method.
          Depending on your payment provider, refunds may take 5–7 business
          days to appear in your account.
        </p>
      </div>

      {/* Section 3 */}
      <div style={sectionStyle}>
        <h4 style={sectionHeadingStyle}>
          3. Non-Returnable Items
        </h4>

        <p style={paragraphStyle}>
          Certain categories such as perishable items, custom software,
          digital media, or items that have been physically damaged or
          tampered with may not qualify for a standard refund.
        </p>
      </div>

      {/* Section 4 */}
      <div style={sectionStyle}>
        <h4 style={sectionHeadingStyle}>
          4. Return Shipping Costs
        </h4>

        <p style={paragraphStyle}>
          Customers may be responsible for the shipping costs associated
          with returning an item. Any applicable restocking fees will be
          communicated before the return is processed.
        </p>
      </div>

      <hr style={dividerStyle} />

      {/* Contact Box */}
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
          Need Help With a Return?
        </h4>

        <p
          style={{
            color: '#64748b',
            fontSize: '14px',
            margin: 0,
            lineHeight: '1.7'
          }}
        >
          If you have any questions about our return or refund process,
          please contact the ShopNest support team.
        </p>
      </div>

    </div>
  );
};

export default ReturnPolicy;