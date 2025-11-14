import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

function DisplayAllReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const mockReviews = [
    {
      id: 1,
      movieTitle: 'Titanic',
      rating: 9,
      content: 'An emotionally charged masterpiece. Beautiful cinematography!',
      reviewerName: 'John Doe',
      lastUpdated: '2023-05-15'
    },
    {
      id: 2,
      movieTitle: 'Avatar',
      rating: 8,
      content: 'Groundbreaking visuals but the story is predictable.',
      reviewerName: 'Jane Smith',
      lastUpdated: '2023-04-22'
    },
    {
      id: 3,
      movieTitle: 'Frozen',
      rating: 7,
      content: 'Great animation and songs, but targeted more towards kids.',
      reviewerName: 'Mike Johnson',
      lastUpdated: '2023-03-10'
    }
  ]

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setTimeout(() => {
        setReviews(mockReviews)
        setLoading(false)
      }, 500)
    } catch (error) {
      toast.error('Failed to fetch reviews')
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
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
                {review.movieTitle}
              </h3>
              <span className="rating-badge">{review.rating}/10</span>
            </div>
            
            <p className="text-muted" style={{ marginBottom: '10px' }}>
              Reviewed by: {review.reviewerName}
            </p>
            
            <p style={{ marginBottom: '10px', lineHeight: '1.5' }}>
              {review.content}
            </p>
            
            <p className="text-muted">
              Last updated: {review.lastUpdated}
            </p>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
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
