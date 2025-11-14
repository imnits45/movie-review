import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
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
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/movies" element={<DisplayAllMovies />} />
      <Route path="/create-review" element={<CreateAReview />} />
      <Route path="/reviews" element={<DisplayAllReviews />} />
      <Route path="/my-reviews" element={<DisplayMyReviews />} />
      <Route path="/shared-reviews" element={<DisplayReviewsSharedWithMe />} />
      <Route path="/edit-review/:id" element={<EditReview />} />
      <Route path="/delete-review/:id" element={<DeleeReview />} />
      <Route path="/share-review/:id" element={<ShareReview />} />
      <Route path="/profile" element={<EditProfile />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
