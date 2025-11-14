import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { reviewService } from '../services/users'

function DisplayAllReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllReviews()
  }, [])

  const fetchAllReviews = async () => {
    try {
      const response = await reviewService.getAllReviews()
      setReviews(response.data)
    } catch (error) {
      toast.error('Failed to fetch reviews')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container"><div className="loading">Loading reviews...</div></div>
  }

  return (
    <div className="container">
      <h1 className="page-title">All Reviews</h1>
      
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="empty-state">
            <p>No reviews found.</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.review_id} className="review-card">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
                  {review.title}
                </h3>
                <span className="rating-badge">{review.rating}/5</span>
              </div>
              
              <p className="text-muted" style={{ marginBottom: '10px' }}>
                Reviewed by: {review.first_name} {review.last_name}
              </p>
              
              <p style={{ marginBottom: '10px', lineHeight: '1.5' }}>
                {review.review}
              </p>
              
              <p className="text-muted">
                Last updated: {new Date(review.modified_time).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
      
      <style jsx>{`
        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          background: #f8f9fa;
          border-radius: 8px;
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

export default DisplayAllReviews
