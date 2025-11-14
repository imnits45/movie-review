-- Create database
CREATE DATABASE IF NOT EXISTS MovieDb;
USE MovieDb;

-- Create tables
CREATE TABLE IF NOT EXISTS users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    mobile VARCHAR(50),
    birth DATE
);

CREATE TABLE IF NOT EXISTS movies(
    movie_id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    release_date DATE
);

CREATE TABLE IF NOT EXISTS reviews(
    review_id INT PRIMARY KEY,
    movie_id INT,
    review VARCHAR(1000) NOT NULL,
    rating INT,
    user_id INT,
    modified_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shares(
    review_id INT,
    user_id INT,
    PRIMARY KEY (review_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (review_id) REFERENCES reviews(review_id) ON DELETE CASCADE
);

-- Insert sample movies
INSERT IGNORE INTO movies (movie_id, title, release_date) VALUES
(1, 'The Shawshank Redemption', '1994-09-23'),
(2, 'The Godfather', '1972-03-24'),
(3, 'The Dark Knight', '2008-07-18'),
(4, 'Pulp Fiction', '1994-10-14'),
(5, 'Forrest Gump', '1994-07-06'),
(6, 'Inception', '2010-07-16'),
(7, 'The Matrix', '1999-03-31'),
(8, 'Goodfellas', '1990-09-19'),
(9, 'The Lord of the Rings: The Return of the King', '2003-12-17'),
(10, 'Schindler\'s List', '1993-12-15');

-- Note: Users and reviews will be created through the application
