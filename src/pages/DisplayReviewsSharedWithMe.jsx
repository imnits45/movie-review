import { useState, useEffect } from 'react'

function DisplayReviewsSharedWithMe() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setReviews([]) // No shared reviews in mock data
      setLoading(false)
    }, 500)
  }, [])

  if (loading) return <div>Loading shared reviews...</div>

  return (
    <div>
      <h2>Reviews Shared With Me</h2>
      {reviews.length === 0 ? (
        <p>No reviews have been shared with you yet.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <h3>{review.title}</h3>
              <p>{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DisplayReviewsSharedWithMe
