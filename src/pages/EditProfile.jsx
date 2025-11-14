import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userService } from '../services/users'
import { useAuth } from '../providers/AuthProvider'

function EditProfile() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    birth: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const navigate = useNavigate()
  const { setUser } = useAuth()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await userService.getProfile()
      const profile = response.data
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        mobile: profile.mobile || '',
        birth: profile.birth ? profile.birth.split('T')[0] : ''
      })
    } catch (error) {
      toast.error('Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.first_name || !formData.last_name) {
      toast.error('First name and last name are required')
      return
    }

    setSaving(true)
    try {
      await userService.updateProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile: formData.mobile,
        birth: formData.birth
      })
      
      // Update user in context
      setUser(prev => ({
        ...prev,
        first_name: formData.first_name,
        last_name: formData.last_name
      }))
      
      toast.success('Profile updated successfully!')
      navigate('/home')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="container"><div className="loading">Loading profile...</div></div>
  }

  return (
    <div className="container">
      <h1 className="page-title">Edit Profile</h1>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
            style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
          />
          <small className="form-text">Email cannot be changed</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="birth">Date of Birth</label>
          <input
            type="date"
            id="birth"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/home')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
