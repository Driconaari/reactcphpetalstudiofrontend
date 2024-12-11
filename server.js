// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 8080;
const SECRET_KEY = 'your_secret_key';

// Middleware to check JWT token
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Example route to set the cookie
app.post('/api/login', (req, res) => {
    const token = jwt.sign({ username: req.body.username }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('jwtToken', token, { httpOnly: true, secure: true, path: '/' });
    res.json({ message: 'Logged in successfully' });
});

// Apply the middleware to all routes
app.use(authenticateJWT);

// Example route
app.get('/api/bouquets', (req, res) => {
    res.json({ message: 'Bouquets data' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});