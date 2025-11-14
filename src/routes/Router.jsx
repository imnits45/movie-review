import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import ProtectedRoute from '../components/ProtectedRoute'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import DisplayAllMovies from '../pages/DisplayAllMovies'
import CreateAReview from '../pages/CreateAReview'
import DisplayAllReviews from '../pages/DisplayAllReviews'
import DisplayMyReviews from '../pages/DisplayMyReviews'
import DisplayReviewsSharedWithMe from '../pages/DisplayReviewsSharedWithMe'
import EditReview from '../pages/EditReview'
import DeleeReview from '../pages/DeleeReview'
import ShareReview from '../pages/ShareReview'
import EditProfile from '../pages/EditProfile'
import ChangePassword from '../pages/ChangePassword'
import NotFound from '../pages/NotFound'

function Router() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/signin" />} />
      <Route path="/signin" element={user ? <Navigate to="/home" /> : <SignIn />} />
      <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
      
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/movies" element={<ProtectedRoute><DisplayAllMovies /></ProtectedRoute>} />
      <Route path="/create-review" element={<ProtectedRoute><CreateAReview /></ProtectedRoute>} />
      <Route path="/reviews" element={<ProtectedRoute><DisplayAllReviews /></ProtectedRoute>} />
      <Route path="/my-reviews" element={<ProtectedRoute><DisplayMyReviews /></ProtectedRoute>} />
      <Route path="/shared-reviews" element={<ProtectedRoute><DisplayReviewsSharedWithMe /></ProtectedRoute>} />
      <Route path="/edit-review/:id" element={<ProtectedRoute><EditReview /></ProtectedRoute>} />
      <Route path="/delete-review/:id" element={<ProtectedRoute><DeleeReview /></ProtectedRoute>} />
      <Route path="/share-review/:id" element={<ProtectedRoute><ShareReview /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
