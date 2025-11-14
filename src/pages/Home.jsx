import { Link } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

function Home() {
  const { user } = useAuth()

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Movie Reviews, {user?.first_name}!</h1>
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
          
          <Link to="/reviews" className="action-card">
            <h3>All Reviews</h3>
            <p>Read reviews from other users</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
