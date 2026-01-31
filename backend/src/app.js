const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const likesRoutes = require('./routes/likes.routes');
const savesRoutes = require('./routes/saves.routes');
const cors = require('cors');


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Support both ports
  credentials: true,
}));    

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api', likesRoutes);
app.use('/api', savesRoutes);

module.exports = app;