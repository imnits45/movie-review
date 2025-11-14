import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/home" className="btn btn-primary">
          Go Home
        </Link>
      </div>
      
      <style jsx>{`
        .not-found-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
          padding: 2rem;
        }
        
        .not-found-content {
          text-align: center;
          background: white;
          padding: 3rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 500px;
        }
        
        .not-found-content h1 {
          font-size: 6rem;
          margin: 0;
          color: #007bff;
          font-weight: bold;
        }
        
        .not-found-content h2 {
          font-size: 2rem;
          margin: 1rem 0;
          color: #333;
        }
        
        .not-found-content p {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        .btn {
          padding: 0.75rem 2rem;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          display: inline-block;
          transition: background-color 0.3s;
          font-size: 1rem;
        }
        
        .btn:hover {
          background-color: #0056b3;
        }
        
        @media (max-width: 768px) {
          .not-found-content h1 {
            font-size: 4rem;
          }
          
          .not-found-content h2 {
            font-size: 1.5rem;
          }
          
          .not-found-content {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  )
}

export default NotFound
