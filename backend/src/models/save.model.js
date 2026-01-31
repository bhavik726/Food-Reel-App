/**
 * SAVES TABLE - Supabase Schema
 * 
 * This file documents the 'saves' table structure in Supabase.
 * The actual database operations are handled directly in controllers using Supabase client.
 * 
 * Table: saves
 * Columns:
 *   - id: UUID (Primary Key, auto-generated)
 *   - user_id: UUID (Foreign Key -> users.id, NOT NULL)
 *   - food_id: UUID (Foreign Key -> foods.id, NOT NULL)
 *   - created_at: TIMESTAMP (auto-generated)
 * 
 * Constraints:
 *   - UNIQUE(user_id, food_id) - Prevents duplicate saves
 *   - ON DELETE CASCADE for foreign keys
 * 
 * Indexes:
 *   - idx_saves_user_id on user_id
 *   - idx_saves_food_id on food_id
 */

// Note: This is now handled by Supabase tables.
// Controllers use: supabase.from('saves').insert([{ user_id, food_id }])
// No Mongoose model needed anymore.

module.exports = {
  tableName: 'saves',
  columns: ['id', 'user_id', 'food_id', 'created_at']
};