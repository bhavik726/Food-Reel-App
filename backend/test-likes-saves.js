require('dotenv').config();
const supabase = require('./src/db/supabase');

async function testLikesAndSaves() {
  console.log('=== Testing Likes and Saves Tables ===\n');

  // Test 1: Check if likes table exists
  console.log('1. Testing likes table...');
  const { data: likesData, error: likesError } = await supabase
    .from('likes')
    .select('*')
    .limit(1);

  if (likesError) {
    console.log('❌ ERROR - Likes table:', likesError.message);
    console.log('   Code:', likesError.code);
    console.log('   Details:', likesError.details);
    console.log('   Hint:', likesError.hint);
  } else {
    console.log('✅ SUCCESS - Likes table exists');
    console.log('   Row count:', likesData.length);
  }

  console.log('');

  // Test 2: Check if saves table exists
  console.log('2. Testing saves table...');
  const { data: savesData, error: savesError } = await supabase
    .from('saves')
    .select('*')
    .limit(1);

  if (savesError) {
    console.log('❌ ERROR - Saves table:', savesError.message);
    console.log('   Code:', savesError.code);
    console.log('   Details:', savesError.details);
    console.log('   Hint:', savesError.hint);
  } else {
    console.log('✅ SUCCESS - Saves table exists');
    console.log('   Row count:', savesData.length);
  }

  console.log('\n=== Test Complete ===');
  console.log('\nIf you see errors above, the tables do not exist in Supabase.');
  console.log('Run the SQL from LIKES_SAVES_SETUP.md in your Supabase SQL Editor.');
}

testLikesAndSaves().catch(console.error);
