# Movie Review Application - Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MySQL** (v8.0 or higher)
3. **npm** or **yarn**

## Database Setup

1. **Start MySQL server**
2. **Create the database and tables:**
   ```sql
   mysql -u root -p < backend/init-db.sql
   ```
   
   Or manually run the SQL commands:
   ```sql
   CREATE DATABASE MovieDb;
   USE MovieDb;
   
   CREATE TABLE users(
       user_id INT AUTO_INCREMENT PRIMARY KEY,
       first_name VARCHAR(50) NOT NULL,
       last_name VARCHAR(50) NOT NULL,
       email VARCHAR(100) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       mobile VARCHAR(50),
       birth DATE
   );
   
   CREATE TABLE movies(
       movie_id INT PRIMARY KEY,
       title VARCHAR(100) NOT NULL,
       release_date DATE
   );
   
   CREATE TABLE reviews(
       review_id INT PRIMARY KEY,
       movie_id INT,
       review VARCHAR(1000) NOT NULL,
       rating INT,
       user_id INT,
       modified_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
       FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
   );
   
   CREATE TABLE shares(
       review_id INT,
       user_id INT,
       PRIMARY KEY (review_id, user_id),
       FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
       FOREIGN KEY (review_id) REFERENCES reviews(review_id) ON DELETE CASCADE
   );
   ```

3. **Update database credentials** in `backend/.env`:
   ```
   PORT=3000
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASS=your_mysql_password
   DB_NAME=MovieDb
   DB_PORT=3306
   JWT_SECRET=supersecretkey
   ```

## Installation

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

## Running the Application

### Option 1: Run both frontend and backend together
```bash
npm run start
```

### Option 2: Run separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000

## Features Implemented

### Authentication
- ✅ User Registration
- ✅ User Login
- ✅ JWT Token Authentication
- ✅ Protected Routes

### User Management
- ✅ View Profile
- ✅ Edit Profile
- ✅ Change Password

### Movies
- ✅ View All Movies
- ✅ Add New Movies

### Reviews
- ✅ Create Reviews
- ✅ View All Reviews
- ✅ View My Reviews
- ✅ Edit Reviews
- ✅ Delete Reviews

### Sharing
- ✅ Share Reviews with Other Users
- ✅ View Reviews Shared with Me

### UI/UX
- ✅ Responsive Design
- ✅ Navigation Bar
- ✅ Footer
- ✅ Loading States
- ✅ Error Handling
- ✅ Toast Notifications

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users` - Get all users (for sharing)

### Movies
- `GET /api/movies` - Get all movies
- `POST /api/movies` - Add new movie
- `GET /api/movies/:id` - Get single movie

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/my` - Get user's reviews
- `GET /api/reviews/:id` - Get single review
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Sharing
- `POST /api/shares` - Share review
- `GET /api/shares/shared-with-me` - Get reviews shared with user

## Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Check MySQL is running
   - Verify credentials in `.env` file
   - Ensure database exists

2. **Port Already in Use:**
   - Change ports in `.env` (backend) or `vite.config.js` (frontend)

3. **CORS Issues:**
   - Backend already configured for CORS
   - Check if frontend URL matches CORS settings

4. **JWT Token Issues:**
   - Clear localStorage and login again
   - Check JWT_SECRET in `.env`

### Development Tips

1. **Hot Reload:** Both frontend and backend support hot reload
2. **Database Changes:** Restart backend after schema changes
3. **Environment Variables:** Restart backend after `.env` changes

## Project Structure

```
movie-review/
├── src/                    # Frontend React app
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── providers/         # Context providers
│   ├── routes/            # Route configuration
│   └── services/          # API services
├── backend/               # Backend Node.js app
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── routes/           # API routes
│   └── .env              # Environment variables
└── README.md             # Project documentation
```

## Next Steps

1. Add movie search functionality
2. Implement review ratings/likes
3. Add user avatars
4. Implement email notifications
5. Add movie categories/genres
6. Implement advanced filtering
