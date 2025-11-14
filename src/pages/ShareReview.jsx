import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userService, shareService } from '../services/users'

function ShareReview() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [loading, setLoading] = useState(true)
  const [sharing, setSharing] = useState(false)
  
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await userService.getAllUsers()
      setUsers(response.data)
    } catch (error) {
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedUser) {
      toast.error('Please select a user to share with')
      return
    }

    setSharing(true)
    try {
      await shareService.shareReview({
        review_id: parseInt(id),
        user_id: parseInt(selectedUser)
      })
      
      toast.success('Review shared successfully!')
      navigate('/my-reviews')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to share review')
    } finally {
      setSharing(false)
    }
  }

  if (loading) {
    return <div className="container"><div className="loading">Loading users...</div></div>
  }

  return (
    <div className="container">
      <h1 className="page-title">Share Review</h1>
      
      <form onSubmit={handleSubmit} className="share-form">
        <div className="form-group">
          <label htmlFor="user">Select User to Share With:</label>
          <select
            id="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Choose a user...</option>
            {users.map(user => (
              <option key={user.user_id} value={user.user_id}>
                {user.first_name} {user.last_name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={sharing}>
            {sharing ? 'Sharing Review...' : 'Share Review'}
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

export default ShareReview
