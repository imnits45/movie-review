import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { movieService, reviewService } from '../services/users'

function CreateAReview() {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState('')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    fetchMovies()
    
    // Check if movie is pre-selected from URL params or location state
    const movieFromParams = searchParams.get('movie')
    const movieFromState = location.state?.movie
    
    if (movieFromParams) {
      setSelectedMovie(movieFromParams)
    } else if (movieFromState) {
      setSelectedMovie(movieFromState.movie_id.toString())
    }
  }, [searchParams, location.state])

  const fetchMovies = async () => {
    try {
      const response = await movieService.getAllMovies()
      setMovies(response.data)
    } catch (error) {
      toast.error('Failed to fetch movies')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedMovie || !review.trim()) {
      toast.error('Please select a movie and write a review')
      return
    }

    setLoading(true)
    try {
      await reviewService.addReview({
        movie_id: parseInt(selectedMovie),
        review: review.trim(),
        rating: parseInt(rating)
      })
      
      toast.success('Review created successfully!')
      navigate('/my-reviews')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create review')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1 className="page-title">Create a Review</h1>
      
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="movie">Select Movie:</label>
          <select
            id="movie"
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
            required
          >
            <option value="">Choose a movie...</option>
            {movies.map(movie => (
              <option key={movie.movie_id} value={movie.movie_id}>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </option>
            ))}
          </select>
        </div>

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
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating Review...' : 'Create Review'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/movies')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateAReview
