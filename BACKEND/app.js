const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Encoding key for tokens
ENCODING_KEY = 'Th0XoASuEcAuX4LEoDWxRUtFK2V42b';

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;