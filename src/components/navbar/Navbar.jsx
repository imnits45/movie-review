import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Movie Reviews
        </Link>
        
        {user && (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                to="/movies" 
                className={`nav-link ${isActive('/movies') ? 'active' : ''}`}
              >
                All Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/my-reviews" 
                className={`nav-link ${isActive('/my-reviews') ? 'active' : ''}`}
              >
                My Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/shared-reviews" 
                className={`nav-link ${isActive('/shared-reviews') ? 'active' : ''}`}
              >
                Shared With Me
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/all-reviews" 
                className={`nav-link ${isActive('/all-reviews') ? 'active' : ''}`}
              >
                All Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/edit-profile" 
                className={`nav-link ${isActive('/edit-profile') ? 'active' : ''}`}
              >
                Edit Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/change-password" 
                className={`nav-link ${isActive('/change-password') ? 'active' : ''}`}
              >
                Change Password
              </Link>
            </li>
            <li className="nav-item">
              <button 
                onClick={logout} 
                className="nav-link logout-link"
                style={{ background: 'none', border: 'none' }}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
