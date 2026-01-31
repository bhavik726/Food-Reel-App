# Supabase Migration Guide

## Step 1: Get Your Supabase Anon Key

1. Go to your Supabase project dashboard: https://rpzrzqeevpvpwksxsnpr.supabase.co
2. Click on the "Settings" icon (⚙️) in the left sidebar
3. Go to "API" section
4. Copy the `anon` `public` key
5. Add it to your `.env` file as `SUPABASE_ANON_KEY`

## Step 2: Create Database Tables

Run these SQL commands in your Supabase SQL Editor (Database > SQL Editor):

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    fullname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create food_partners table
CREATE TABLE IF NOT EXISTS food_partners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create foods table
CREATE TABLE IF NOT EXISTS foods (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    video TEXT NOT NULL,
    food_partner_id UUID REFERENCES food_partners(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_food_partners_email ON food_partners(email);
CREATE INDEX IF NOT EXISTS idx_foods_partner ON foods(food_partner_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your needs)
CREATE POLICY "Allow all operations for authenticated users" ON users
    FOR ALL USING (true);

CREATE POLICY "Allow all operations for food partners" ON food_partners
    FOR ALL USING (true);

CREATE POLICY "Allow all operations for foods" ON foods
    FOR ALL USING (true);
```

## Step 3: Update Your .env File

Make sure your `.env` file has:
```
SUPABASE_URL=https://rpzrzqeevpvpwksxsnpr.supabase.co
SUPABASE_ANON_KEY=your_actual_anon_key_here
```

## Step 4: Restart Your Server

The code has been updated to use Supabase instead of MongoDB!
