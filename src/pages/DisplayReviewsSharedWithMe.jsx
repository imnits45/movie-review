import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { shareService } from '../services/users'

function DisplayReviewsSharedWithMe() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSharedReviews()
  }, [])

  const fetchSharedReviews = async () => {
    try {
      const response = await shareService.getSharedReviews()
      setReviews(response.data)
    } catch (error) {
      toast.error('Failed to fetch shared reviews')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container"><div className="loading">Loading shared reviews...</div></div>
  }

  return (
    <div className="container">
      <h1 className="page-title">Reviews Shared With Me</h1>

      {reviews.length === 0 ? (
        <div className="empty-state">
          <p>No reviews have been shared with you yet.</p>
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
                  By: {review.first_name} {review.last_name}
                </small>
                <br />
                <small>
                  Created: {new Date(review.modified_time).toLocaleDateString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DisplayReviewsSharedWithMe
