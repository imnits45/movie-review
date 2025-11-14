import React from 'react';

const StyleDemo = () => {
  return (
    <div className="container">
      <h1 className="page-title">UI Style Demo</h1>
      
      <div className="hero-section">
        <h1>Modern Movie Reviews</h1>
        <p>Experience our refreshed, professional interface with improved readability and modern design elements.</p>
      </div>

      <div className="action-cards">
        <div className="action-card">
          <h3>Enhanced Typography</h3>
          <p>Clean, readable fonts with proper spacing and hierarchy using Inter font family.</p>
        </div>
        
        <div className="action-card">
          <h3>Modern Colors</h3>
          <p>Professional color palette with subtle gradients and improved contrast ratios.</p>
        </div>
        
        <div className="action-card">
          <h3>Smooth Animations</h3>
          <p>Subtle hover effects and transitions that enhance user experience without being distracting.</p>
        </div>
      </div>

      <div className="movie-card">
        <h3>Sample Movie Card</h3>
        <p className="text-muted">This demonstrates the improved card styling with better shadows and spacing.</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn btn-primary">Primary Action</button>
          <button className="btn btn-secondary">Secondary</button>
          <span className="rating-badge">8.5</span>
        </div>
      </div>

      <div className="form-group">
        <label>Sample Form Input</label>
        <input type="text" placeholder="Enhanced form styling with better focus states" />
        <div className="form-text">Form inputs now have improved focus states and better accessibility.</div>
      </div>

      <div className="form-actions">
        <button className="btn btn-success">Success Button</button>
        <button className="btn btn-danger">Danger Button</button>
        <button className="btn btn-info">Info Button</button>
      </div>
    </div>
  );
};

export default StyleDemo;
