# Likes and Saves Setup for Supabase

## IMPORTANT: Run this SQL in your Supabase SQL Editor to create the likes and saves tables:

```sql
-- Drop existing tables if they exist (only if you need to recreate them)
-- DROP TABLE IF EXISTS likes CASCADE;
-- DROP TABLE IF EXISTS saves CASCADE;

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    food_id UUID REFERENCES foods(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, food_id)
);

-- Create saves table  
CREATE TABLE IF NOT EXISTS saves (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    food_id UUID REFERENCES foods(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, food_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_food_id ON likes(food_id);
CREATE INDEX IF NOT EXISTS idx_saves_user_id ON saves(user_id);
CREATE INDEX IF NOT EXISTS idx_saves_food_id ON saves(food_id);

-- Enable Row Level Security
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saves ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can manage their own likes" ON likes;
DROP POLICY IF EXISTS "Public can view likes" ON likes;
DROP POLICY IF EXISTS "Users can manage their own saves" ON saves;
DROP POLICY IF EXISTS "Public can view saves" ON saves;

-- Create RLS policies - Allow all operations for now (you can restrict later)
CREATE POLICY "Allow all for likes" ON likes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for saves" ON saves FOR ALL USING (true) WITH CHECK (true);
```

## Steps to Execute:

1. Go to your Supabase Dashboard: https://rpzrzqeevpvpwksxsnpr.supabase.co
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Paste the SQL code above
5. Click **Run**
6. You should see "Success" message

## Verification:

After running, verify the tables exist by running:

```sql
-- Check likes table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'likes';

-- Check saves table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'saves';

-- Test insert (replace with actual UUIDs from your users and foods tables)
-- INSERT INTO likes (user_id, food_id) VALUES ('your-user-uuid', 'your-food-uuid');
```

Both tables should have these columns:
- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to users table
- `food_id` (UUID) - Foreign key to foods table  
- `created_at` (TIMESTAMP) - Auto-generated timestamp

**Note:** Column names MUST be `user_id` and `food_id` (with underscores), not `userId` or `foodId`!
