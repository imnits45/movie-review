import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function CreateAReview() {
  const [formData, setFormData] = useState({
    rating: '8',
    content: ''
  })
  const [loading, setLoading] = useState(false)
  const [movieTitle, setMovieTitle] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const mockMovies = [
    { id: 1, title: 'Avatar' },
    { id: 2, title: 'Titanic' },
    { id: 3, title: 'The Dark Knight' }
  ]

  useEffect(() => {
    const movieId = searchParams.get('movie')
    if (movieId) {
      const movie = mockMovies.find(m => m.id === parseInt(movieId))
      if (movie) {
        setMovieTitle(movie.title)
      }
    }
  }, [searchParams])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.rating || !formData.content) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      toast.success('Review created successfully!')
      navigate('/my-reviews')
    } catch (error) {
      toast.error('Failed to create review')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/movies')
  }

  return (
    <div className="container">
      <h1 className="page-title">Create Review for "{movieTitle || 'Titanic'}"</h1>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
        <div className="form-group">
          <label htmlFor="rating">Rating (1-10)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="10"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Your Review</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="8"
            placeholder="A timeless classic with powerful emotions and storytelling."
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Creating Review...' : 'Submit Review'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateAReview
