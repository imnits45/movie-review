import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Movie Reviews</h3>
            <p>Your go-to platform for honest movie reviews and ratings.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/movies">Browse Movies</a></li>
              <li><a href="/reviews">All Reviews</a></li>
              <li><a href="/create-review">Write Review</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Account</h4>
            <ul>
              <li><a href="/profile">My Profile</a></li>
              <li><a href="/my-reviews">My Reviews</a></li>
              <li><a href="/shared-reviews">Shared Reviews</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Movie Reviews. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
