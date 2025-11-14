# Movie Review Client

A React-based movie review application that allows users to create, manage, and share movie reviews.

## Features

- User authentication (Sign In/Sign Up)
- Browse movies
- Create and edit movie reviews
- View all reviews and personal reviews
- Share reviews with other users
- View reviews shared by others
- User profile management
- Password change functionality

## Project Structure

```
├── App.css
├── App.jsx
├── assets
│   └── react.svg
├── components
│   ├── footer
│   │   ├── Footer.css
│   │   └── Footer.jsx
│   ├── layout
│   │   └── Layout.jsx
│   └── navbar
│       ├── Navbar.css
│       └── Navbar.jsx
├── index.css
├── main.jsx
├── pages
│   ├── ChangePassword.jsx
│   ├── CreateAReview.jsx
│   ├── DeleeReview.jsx
│   ├── DisplayAllMovies.jsx
│   ├── DisplayAllReviews.jsx
│   ├── DisplayMyReviews.jsx
│   ├── DisplayReviewsSharedWithMe.jsx
│   ├── EditProfile.jsx
│   ├── EditReview.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   ├── ShareReview.jsx
│   ├── SignIn.css
│   ├── SignIn.jsx
│   └── SignUp.jsx
├── providers
│   └── AuthProvider.jsx
├── routes
│   └── Router.jsx
└── services
    └── users.js
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Technologies Used

- React 19
- React Router DOM
- Axios for API calls
- React Toastify for notifications
- Vite for build tooling

## Pages Overview

- **SignIn/SignUp**: User authentication
- **Home**: Dashboard with quick actions
- **DisplayAllMovies**: Browse available movies
- **CreateAReview**: Write new movie reviews
- **DisplayAllReviews**: View all public reviews
- **DisplayMyReviews**: Manage personal reviews
- **DisplayReviewsSharedWithMe**: View reviews shared by others
- **EditReview**: Edit existing reviews
- **ShareReview**: Share reviews with other users
- **EditProfile**: Update user profile
- **ChangePassword**: Change user password
- **NotFound**: 404 error page

## API Integration

The application is set up to work with a backend API. Update the API endpoints in `src/services/users.js` to match your backend implementation.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

##SQL Query

create MovieDb;
Create table users(
     user_id INT AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(50) NOT NULL,
     last_name VARCHAR(50) NOT NULL,
     email VARCHAR(100) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     mobile VARCHAR(50),
     birth DATE
     );

CREATE TABLE reviews(
review_id INT PRIMARY KEY,
movie_id INT,
review VARCHAR(100) NOT NULL,
rating INT,
user_id int,
modified_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
);

CREATE TABLE shares(
review_id INT,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

CREATE TABLE movies(
movie_id INT PRIMARY KEY,
title VARCHAR(100) NOT NULL,
release_date DATE
);
