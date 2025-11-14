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


exports.getReviews = async (req, res) => {
    const movie_id = req.params.movie_id;
    const [rows] = await pool.query("SELECT * FROM reviews WHERE movie_id = ?", [movie_id]);
    res.json(rows);
};
