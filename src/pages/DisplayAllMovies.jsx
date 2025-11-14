import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { movieService } from '../services/users'

function DisplayAllMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMovie, setNewMovie] = useState({ title: '', release_date: '' })

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const response = await movieService.getAllMovies()
      setMovies(response.data)
    } catch (error) {
      toast.error('Failed to fetch movies')
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddMovie = async (e) => {
    e.preventDefault()
    try {
      await movieService.addMovie(newMovie)
      toast.success('Movie added successfully!')
      setNewMovie({ title: '', release_date: '' })
      setShowAddForm(false)
      fetchMovies()
    } catch (error) {
      toast.error('Failed to add movie')
    }
  }

  if (loading) {
    return <div className="container"><div className="loading">Loading movies...</div></div>
  }

  return (
    <div className="container">
      <div className="movies-header">
        <h1 className="page-title">All Movies</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add Movie'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-movie-form">
          <h3>Add New Movie</h3>
          <form onSubmit={handleAddMovie}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={newMovie.title}
                onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Release Date:</label>
              <input
                type="date"
                value={newMovie.release_date}
                onChange={(e) => setNewMovie({...newMovie, release_date: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">Add Movie</button>
          </form>
        </div>
      )}
      
      <div className="movies-grid">
        {movies.length === 0 ? (
          <p>No movies found. Add some movies to get started!</p>
        ) : (
          movies.map(movie => (
            <div key={movie.movie_id} className="movie-card">
              <h3>{movie.title}</h3>
              <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
              <Link to={`/create-review?movie=${movie.movie_id}`} className="btn btn-primary">
                Review this Movie
              </Link>
            </div>
          ))
        )}
      </div>
      
      <style jsx>{`
        .movies-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .add-movie-form {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .movies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }
        
        .movie-card h3 {
          margin-bottom: 10px;
          color: #333;
          font-size: 20px;
          font-weight: 600;
        }
        
        .movie-card p {
          margin: 10px 0 20px 0;
          color: #666;
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

export default DisplayAllMovies
