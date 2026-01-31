/**
 * LIKES TABLE - Supabase Schema
 * 
 * This file documents the 'likes' table structure in Supabase.
 * The actual database operations are handled directly in controllers using Supabase client.
 * 
 * Table: likes
 * Columns:
 *   - id: UUID (Primary Key, auto-generated)
 *   - user_id: UUID (Foreign Key -> users.id, NOT NULL)
 *   - food_id: UUID (Foreign Key -> foods.id, NOT NULL)
 *   - created_at: TIMESTAMP (auto-generated)
 * 
 * Constraints:
 *   - UNIQUE(user_id, food_id) - Prevents duplicate likes
 *   - ON DELETE CASCADE for foreign keys
 * 
 * Indexes:
 *   - idx_likes_user_id on user_id
 *   - idx_likes_food_id on food_id
 */

// Note: This is now handled by Supabase tables.
// Controllers use: supabase.from('likes').insert([{ user_id, food_id }])
// No Mongoose model needed anymore.

module.exports = {
  tableName: 'likes',
  columns: ['id', 'user_id', 'food_id', 'created_at']
};