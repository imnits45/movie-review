const pool = require("../db");

exports.addShare = async (req, res) => {
    try {
        const { review_id, user_id } = req.body;

        // Check if review exists and belongs to current user
        const [reviewRows] = await pool.query(
            "SELECT * FROM reviews WHERE review_id = ? AND user_id = ?", 
            [review_id, req.user.user_id]
        );
        
        if (reviewRows.length === 0) {
            return res.status(404).json({ message: "Review not found or not owned by you" });
        }

        // Check if already shared with this user
        const [existingShare] = await pool.query(
            "SELECT * FROM shares WHERE review_id = ? AND user_id = ?",
            [review_id, user_id]
        );

        if (existingShare.length > 0) {
            return res.status(400).json({ message: "Review already shared with this user" });
        }

        await pool.query(
            "INSERT INTO shares(review_id, user_id) VALUES (?, ?)",
            [review_id, user_id]
        );

        res.json({ message: "Review shared successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSharedWithMe = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT r.*, m.title, u.first_name, u.last_name 
            FROM shares s
            JOIN reviews r ON s.review_id = r.review_id
            JOIN movies m ON r.movie_id = m.movie_id
            JOIN users u ON r.user_id = u.user_id
            WHERE s.user_id = ?
        `, [req.user.user_id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
