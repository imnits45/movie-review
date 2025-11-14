const pool = require("../db");

async function getNextReviewId() {
    const [rows] = await pool.query("SELECT MAX(review_id) AS max FROM reviews");
    return (rows[0].max || 0) + 1;
}

exports.addReview = async (req, res) => {
    try {
        const { movie_id, review, rating } = req.body;
        const user_id = req.user.user_id;

        const newId = await getNextReviewId();

        await pool.query(
            "INSERT INTO reviews(review_id, movie_id, review, rating, user_id) VALUES (?, ?, ?, ?, ?)",
            [newId, movie_id, review, rating, user_id]
        );

        res.json({ message: "Review added", review_id: newId });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT r.*, m.title, u.first_name, u.last_name 
            FROM reviews r 
            JOIN movies m ON r.movie_id = m.movie_id 
            JOIN users u ON r.user_id = u.user_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMyReviews = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT r.*, m.title 
            FROM reviews r 
            JOIN movies m ON r.movie_id = m.movie_id 
            WHERE r.user_id = ?
        `, [req.user.user_id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const [rows] = await pool.query(`
            SELECT r.*, m.title 
            FROM reviews r 
            JOIN movies m ON r.movie_id = m.movie_id 
            WHERE r.review_id = ? AND r.user_id = ?
        `, [reviewId, req.user.user_id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "Review not found" });
        }
        
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { review, rating } = req.body;
        const reviewId = req.params.id;
        
        await pool.query(
            "UPDATE reviews SET review = ?, rating = ? WHERE review_id = ? AND user_id = ?",
            [review, rating, reviewId, req.user.user_id]
        );
        
        res.json({ message: "Review updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        
        await pool.query("DELETE FROM reviews WHERE review_id = ? AND user_id = ?", 
            [reviewId, req.user.user_id]);
        
        res.json({ message: "Review deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
