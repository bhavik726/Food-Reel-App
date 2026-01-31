# Food Reels App

A TikTok-style food video sharing platform where food partners can upload short videos of their dishes, and users can browse, like, and save their favorites.

## Features

- 🎥 Vertical scrolling video feed (TikTok-style)
- 👤 Separate authentication for users and food partners
- ❤️ Like and save videos
- 📱 Mobile-first responsive design
- 🏪 Food partner profiles with video galleries
- ⬆️ Video upload for food partners

## Tech Stack

### Frontend
- React with Vite
- React Router for navigation
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js with Express
- Supabase (PostgreSQL) for database
- ImageKit for video storage
- JWT authentication with bcrypt
- Cookie-based sessions

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Supabase account
- ImageKit account

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Fill in your environment variables in `.env`:
   - `JWT_SECRET`: A random secure string
   - `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_URL_ENDPOINT`: From ImageKit dashboard
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY`: From Supabase project settings

5. Create the following tables in your Supabase SQL Editor:

   ```sql
   -- Users table
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     fullname TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Food partners table
   CREATE TABLE food_partners (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL,
     phone TEXT,
     address TEXT,
     contact_name TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Foods table
   CREATE TABLE foods (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     description TEXT,
     video TEXT NOT NULL,
     food_partner_id UUID REFERENCES food_partners(id),
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Likes table
   CREATE TABLE likes (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     food_id UUID REFERENCES foods(id) ON DELETE CASCADE,
     created_at TIMESTAMP DEFAULT NOW(),
     UNIQUE(user_id, food_id)
   );

   -- Saves table
   CREATE TABLE saves (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     food_id UUID REFERENCES foods(id) ON DELETE CASCADE,
     created_at TIMESTAMP DEFAULT NOW(),
     UNIQUE(user_id, food_id)
   );
   ```

6. Start the backend server:
   ```bash
   npm start
   ```

   Server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update `src/main.jsx` to set the correct API base URL if needed:
   ```javascript
   axios.defaults.baseURL = 'http://localhost:3000';
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5174`

## Usage

### For Users
1. Register/Login as a user
2. Browse food videos in the vertical scrolling feed
3. Like videos by tapping the heart icon
4. Save videos by tapping the bookmark icon
5. View saved videos in the "Saved" tab
6. Visit food partner stores to see all their videos

### For Food Partners
1. Register/Login as a food partner
2. Upload videos with title and description
3. Videos appear in the main feed for all users
4. Users can visit your profile to see all your uploads

## API Endpoints

### Authentication
- `POST /api/auth/users/register` - Register new user
- `POST /api/auth/users/login` - User login
- `POST /api/auth/food-partners/register` - Register new food partner
- `POST /api/auth/food-partners/login` - Food partner login

### Food Videos
- `GET /api/food` - Get all food videos
- `POST /api/food` - Create new food video (food partner only)

### Likes
- `POST /api/foods/:foodId/like` - Like a video
- `DELETE /api/foods/:foodId/like` - Unlike a video
- `GET /api/likes` - Get user's liked videos

### Saves
- `POST /api/foods/:foodId/save` - Save a video
- `DELETE /api/foods/:foodId/save` - Unsave a video
- `GET /api/saved` - Get user's saved videos

### Food Partners
- `GET /api/food-partners/:id` - Get food partner profile

## Project Structure

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Authentication middleware
│   ├── models/         # Database schema docs
│   ├── routes/         # API routes
│   ├── services/       # External services (ImageKit)
│   └── db/            # Database connection
├── server.js          # Entry point
└── .env.example       # Environment template

frontend/
├── src/
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── routes/        # Router configuration
│   └── styles/        # CSS files
└── index.html         # HTML template
```

## License

MIT
