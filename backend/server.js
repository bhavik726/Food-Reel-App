require('dotenv').config();
const app = require('./src/app');

// No MongoDB connection needed anymore - using Supabase

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('Using Supabase as database');
}); 