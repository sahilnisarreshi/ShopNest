import React from 'react';

const About = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '50px 35px',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '28px',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    boxShadow: '0 20px 60px rgba(15, 23, 42, 0.10)',
    backdropFilter: 'blur(15px)',
    animation: 'pageFade 0.6s ease'
  };

  const socialBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 20px',
    borderRadius: '12px',
    background: '#f1f5f9',
    color: '#334155',
    border: '1px solid #e2e8f0',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>

      {/* Profile Picture */}
      <img
        src="/dp.png"
        alt="Profile"
        style={{
          width: '170px',
          height: '170px',
          objectFit: 'cover',
          borderRadius: '50%',
          border: '5px solid #6366f1',
          boxShadow: '0 10px 35px rgba(99, 102, 241, 0.25)',
          marginBottom: '25px'
        }}
      />

      {/* Heading */}
      <h2
        style={{
          fontSize: '2.5rem',
          marginBottom: '10px',
          color: '#18181b'
        }}
      >
        About Me
      </h2>

      {/* Name */}
      <h3
        style={{
          fontSize: '1.5rem',
          color: '#4f46e5',
          marginBottom: '20px'
        }}
      >
        Sahil Nisar Reshi
      </h3>

      {/* Bio */}
      <p
        style={{
          color: '#64748b',
          lineHeight: '1.8',
          fontSize: '16px',
          maxWidth: '650px',
          margin: '0 auto 30px'
        }}
      >
        <strong style={{ color: '#334155' }}>
          Computer Engineering student and developer.
        </strong>{' '}
        I enjoy building modern web applications, exploring new technologies,
        solving problems with code, and turning ideas into practical digital
        experiences.
      </p>

      {/* Divider */}
      <div
        style={{
          width: '70px',
          height: '4px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          margin: '0 auto 30px'
        }}
      />

      {/* Social Heading */}
      <h3
        style={{
          color: '#18181b',
          fontSize: '1.25rem',
          marginBottom: '18px'
        }}
      >
        Connect With Me
      </h3>

      {/* Social Links */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px'
        }}
      >

        {/* YouTube */}
        <a
          href="https://youtube.com/@mohammad_sahil01?si=SoGPE5Rcou8Oielt"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: '#fef2f2',
            color: '#dc2626',
            borderColor: '#fecaca'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.background = '#fee2e2';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#fef2f2';
          }}
        >
          📺 YouTube
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/sahilnisar___?igsi=dmI4dHU4Y2F3ZXd5&utm_source=qr"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: '#fdf2f8',
            color: '#db2777',
            borderColor: '#fbcfe8'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.background = '#fce7f3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#fdf2f8';
          }}
        >
          📸 Instagram
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/sahil-nisar-reshi?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: '#eff6ff',
            color: '#2563eb',
            borderColor: '#bfdbfe'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.background = '#dbeafe';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#eff6ff';
          }}
        >
          💼 LinkedIn
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/sahilnisarreshi"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: '#f8fafc',
            color: '#18181b',
            borderColor: '#cbd5e1'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.background = '#f1f5f9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#f8fafc';
          }}
        >
          💻 GitHub
        </a>

        {/* LeetCode */}
        <a
          href="https://leetcode.com/sahilnisar/"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: '#fffbeb',
            color: '#d97706',
            borderColor: '#fde68a'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.background = '#fef3c7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#fffbeb';
          }}
        >
          🧩 LeetCode
        </a>

        {/* Gamma */}
        <a
          href="https://sahil-nisar-reshi-kku01j5.gamma.site/"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: '#f5f3ff',
            color: '#7c3aed',
            borderColor: '#ddd6fe'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.background = '#ede9fe';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#f5f3ff';
          }}
        >
          🎨 Gamma
        </a>

      </div>
    </div>
  );
};

export default About;