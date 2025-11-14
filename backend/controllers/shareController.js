const pool = require("../db");

exports.addShare = async (req, res) => {
    try {
        const { review_id } = req.body;
        const user_id = req.user.user_id;

        await pool.query(
            "INSERT INTO shares(review_id, user_id) VALUES (?, ?)",
            [review_id, user_id]
        );

        res.json({ message: "Review shared" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
