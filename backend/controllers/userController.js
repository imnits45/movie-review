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

exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT user_id, first_name, last_name, email FROM users");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT user_id, first_name, last_name, email, mobile, birth FROM users WHERE user_id = ?", [req.user.user_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { first_name, last_name, mobile, birth } = req.body;
        await pool.query("UPDATE users SET first_name = ?, last_name = ?, mobile = ?, birth = ? WHERE user_id = ?", 
            [first_name, last_name, mobile, birth, req.user.user_id]);
        res.json({ message: "Profile updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const [rows] = await pool.query("SELECT password FROM users WHERE user_id = ?", [req.user.user_id]);
        
        const ok = await bcrypt.compare(currentPassword, rows[0].password);
        if (!ok) return res.status(400).json({ message: "Current password is incorrect" });

        const hashed = await bcrypt.hash(newPassword, 10);
        await pool.query("UPDATE users SET password = ? WHERE user_id = ?", [hashed, req.user.user_id]);
        
        res.json({ message: "Password changed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
