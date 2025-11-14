import { useAuth } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'

function Home() {
  const { user } = useAuth()

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Movie Reviews, {user?.firstName}!</h1>
        <p>Discover, review, and share your thoughts about movies</p>
      </div>
      
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-cards">
          <Link to="/movies" className="action-card">
            <h3>Browse Movies</h3>
            <p>Explore our collection of movies</p>
          </Link>
          
          <Link to="/create-review" className="action-card">
            <h3>Write a Review</h3>
            <p>Share your thoughts about a movie</p>
          </Link>
          
          <Link to="/my-reviews" className="action-card">
            <h3>My Reviews</h3>
            <p>View and manage your reviews</p>
          </Link>
          
          <Link to="/shared-reviews" className="action-card">
            <h3>Shared Reviews</h3>
            <p>See reviews shared with you</p>
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .home-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .hero-section {
          text-align: center;
          margin-bottom: 3rem;
          padding: 3rem 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 10px;
        }
        
        .hero-section h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .hero-section p {
          font-size: 1.2rem;
          opacity: 0.9;
        }
        
        .quick-actions h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
        }
        
        .action-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .action-card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-decoration: none;
          color: #333;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .action-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        
        .action-card h3 {
          margin-bottom: 1rem;
          color: #007bff;
        }
        
        .action-card p {
          color: #666;
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default Home
