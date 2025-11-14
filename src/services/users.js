import api from './api';

export const userService = {
  signIn: (credentials) => api.post('/users/signin', credentials),
  signUp: (userData) => api.post('/users/signup', userData),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.put('/users/change-password', data),
  getAllUsers: () => api.get('/users'),
};

export const movieService = {
  getAllMovies: () => api.get('/movies'),
  getMovie: (id) => api.get(`/movies/${id}`),
  addMovie: (data) => api.post('/movies', data),
};

export const reviewService = {
  getAllReviews: () => api.get('/reviews'),
  getMyReviews: () => api.get('/reviews/my'),
  addReview: (data) => api.post('/reviews', data),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
  getReview: (id) => api.get(`/reviews/${id}`),
};

export const shareService = {
  shareReview: (data) => api.post('/shares', data),
  getSharedReviews: () => api.get('/shares/shared-with-me'),
};
