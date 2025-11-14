import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reviewService } from '../services/users'

function EditReview() {
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(5)
  const [movieTitle, setMovieTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchReview()
  }, [id])

  const fetchReview = async () => {
    try {
      const response = await reviewService.getReview(id)
      const reviewData = response.data
      setReview(reviewData.review)
      setRating(reviewData.rating)
      setMovieTitle(reviewData.title)
    } catch (error) {
      toast.error('Failed to fetch review')
      navigate('/my-reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!review.trim()) {
      toast.error('Please write a review')
      return
    }

    setSaving(true)
    try {
      await reviewService.updateReview(id, {
        review: review.trim(),
        rating: parseInt(rating)
      })
      
      toast.success('Review updated successfully!')
      navigate('/my-reviews')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update review')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="container"><div className="loading">Loading review...</div></div>
  }

  return (
    <div className="container">
      <h1 className="page-title">Edit Review for "{movieTitle}"</h1>
      
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="review">Your Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            rows={6}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Updating Review...' : 'Update Review'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/my-reviews')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditReview
