const pool = require("../db");

// Manual ID generation since movie_id is NOT auto-increment
async function getNextMovieId() {
    const [rows] = await pool.query("SELECT MAX(movie_id) AS max FROM movies");
    return (rows[0].max || 0) + 1;
}

exports.addMovie = async (req, res) => {
    try {
        const { title, release_date } = req.body;

        const newId = await getNextMovieId();

        await pool.query(
            "INSERT INTO movies(movie_id, title, release_date) VALUES (?, ?, ?)",
            [newId, title, release_date]
        );

        res.json({ message: "Movie added", movie_id: newId });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMovies = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM movies");
    res.json(rows);
};

exports.getMovie = async (req, res) => {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT * FROM movies WHERE movie_id = ?", [id]);
    res.json(rows[0]);
};
