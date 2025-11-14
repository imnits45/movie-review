const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, mobile, birth } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users(first_name, last_name, email, password, mobile, birth)
                     VALUES (?, ?, ?, ?, ?, ?)`;

        const [result] = await pool.query(sql, [
            first_name, last_name, email, hashed, mobile, birth
        ]);

        res.json({ message: "User registered", user_id: result.insertId });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0)
            return res.status(400).json({ message: "User not found" });

        const user = rows[0];

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);

        res.json({ token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
