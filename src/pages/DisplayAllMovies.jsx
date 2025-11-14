import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function DisplayAllMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const mockMovies = [
    { id: 1, title: 'Avatar', releaseDate: '2009-02-21' },
    { id: 2, title: 'Titanic', releaseDate: '1997-08-09' },
    { id: 3, title: 'The Dark Knight', releaseDate: '2008-12-16' }
  ]

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      setTimeout(() => {
        setMovies(mockMovies)
        setLoading(false)
      }, 500)
    } catch (error) {
      toast.error('Failed to fetch movies')
      console.error('Error fetching movies:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container"><div className="loading">Loading movies...</div></div>
  }

  return (
    <div className="container">
      <h1 className="page-title">All Movies</h1>
      
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <p><strong>Release Date:</strong> {movie.releaseDate}</p>
            <Link to={`/create-review?movie=${movie.id}`} className="btn btn-primary">
              Review this Movie
            </Link>
          </div>
        ))}
      </div>
      
      <style jsx>{`
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
