const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running :)'));

// Define Routes
app.use('/API/users', require('./routes/api/users'));
app.use('/API/auth', require('./routes/api/auth'));
app.use('/API/profile', require('./routes/api/profile'));
app.use('/API/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))