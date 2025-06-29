const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(fileUpload()); // Enable file uploads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize SQLite database
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        // Create users table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);
        console.log('Database connected and table initialized');
    }
});

const SECRET_KEY = process.env.SECRET_KEY;

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
            if (err) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
        if (err || !row || !(await bcrypt.compare(password, row.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.authData = authData;
            next();
        });
    } else {
        res.sendStatus(403);
    }
}

// Protected endpoint to handle image uploads
app.post('/upload', verifyToken, async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    const image = req.files.image;
    const form = new FormData();
    form.append('image', image.data, image.name);

    try {
        const aiResponse = await axios.post('http://localhost:5000/process_image', form, {
            headers: form.getHeaders()
        });
        res.json(aiResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing image' });
    }
});

app.listen(3000, () => console.log('Backend running on port 3000'));

// Close database connection on process exit
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database', err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});