import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reviewService } from '../services/users'

function DisplayMyReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyReviews()
  }, [])

  const fetchMyReviews = async () => {
    try {
      const response = await reviewService.getMyReviews()
      setReviews(response.data)
    } catch (error) {
      toast.error('Failed to fetch reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewService.deleteReview(reviewId)
        toast.success('Review deleted successfully!')
        fetchMyReviews() // Refresh the list
      } catch (error) {
        toast.error('Failed to delete review')
      }
    }
  }

  if (loading) {
    return <div className="container"><div className="loading">Loading your reviews...</div></div>
  }

  return (
    <div className="container">
      <div className="reviews-header">
        <h1 className="page-title">My Reviews</h1>
        <Link to="/create-review" className="btn btn-primary">
          Write New Review
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="empty-state">
          <p>You haven't written any reviews yet.</p>
          <Link to="/create-review" className="btn btn-primary">
            Write Your First Review
          </Link>
        </div>
      ) : (
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.review_id} className="review-card">
              <div className="review-header">
                <h3>{review.title}</h3>
                <div className="rating">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  <span className="rating-number">({review.rating}/5)</span>
                </div>
              </div>
              
              <p className="review-content">{review.review}</p>
              
              <div className="review-meta">
                <small>
                  Created: {new Date(review.modified_time).toLocaleDateString()}
                </small>
              </div>
              
              <div className="review-actions">
                <Link 
                  to={`/edit-review/${review.review_id}`}
                  className="btn btn-sm btn-secondary"
                >
                  Edit
                </Link>
                <Link 
                  to={`/share-review/${review.review_id}`}
                  className="btn btn-sm btn-info"
                >
                  Share
                </Link>
                <button 
                  onClick={() => handleDelete(review.review_id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .reviews-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .reviews-grid {
          display: grid;
          gap: 1.5rem;
        }

        .review-card {
          background: white;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .review-header h3 {
          margin: 0;
          color: #333;
        }

        .rating {
          color: #ffc107;
          font-size: 1.2rem;
        }

        .rating-number {
          color: #666;
          font-size: 0.9rem;
          margin-left: 0.5rem;
        }

        .review-content {
          margin: 1rem 0;
          line-height: 1.6;
          color: #555;
        }

        .review-meta {
          margin: 1rem 0;
          color: #666;
        }

        .review-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  )
}

export default DisplayMyReviews
