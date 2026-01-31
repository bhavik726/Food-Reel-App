require('dotenv').config();
const supabase = require('./src/db/supabase');

async function testSupabaseConnection() {
    console.log('Testing Supabase connection...');
    console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
    console.log('SUPABASE_ANON_KEY exists:', !!process.env.SUPABASE_ANON_KEY);
    
    try {
        // Test connection by trying to query users table
        const { data, error } = await supabase
            .from('users')
            .select('count')
            .limit(1);
        
        if (error) {
            console.error('❌ Supabase Error:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            
            if (error.message.includes('relation') || error.message.includes('does not exist')) {
                console.log('\n⚠️  Tables do not exist! You need to create them.');
                console.log('Run the SQL from SUPABASE_SETUP.md in your Supabase SQL Editor.');
            }
        } else {
            console.log('✅ Supabase connection successful!');
            console.log('Response:', data);
        }
    } catch (err) {
        console.error('❌ Connection test failed:', err.message);
    }
}

testSupabaseConnection();
