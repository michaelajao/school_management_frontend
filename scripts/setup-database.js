/**
 * Setup Railway PostgreSQL database schema and test user
 * This connects directly to your Railway database and creates the necessary tables
 */

const { Client } = require('pg');
const fs = require('fs');

// Your Railway database connection
const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres:rtNZicRKWcwZnodkqRljCIuIpZBglhth@railway.internal:5432/railway';

async function setupDatabase() {
  const client = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    console.log('🔌 Connecting to Railway PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected successfully!');

    // Read the schema SQL file
    console.log('📖 Reading schema file...');
    const schemaSQL = fs.readFileSync('./scripts/create-basic-schema.sql', 'utf8');
    
    console.log('🗄️ Creating database schema...');
    await client.query(schemaSQL);
    
    console.log('✅ Database schema created successfully!');
    
    // Test the setup by querying the created data
    console.log('\n📊 Verifying setup...');
    
    const schoolResult = await client.query('SELECT id, name, alias FROM "School"');
    console.log('Schools:', schoolResult.rows);
    
    const userResult = await client.query('SELECT id, email, "firstName", "lastName", role FROM "User"');
    console.log('Users:', userResult.rows);
    
    console.log('\n🎉 Database setup complete!');
    console.log('\n🔑 Test Login Credentials:');
    console.log('Email: admin@testschool.com');
    console.log('Password: Test123!');
    console.log('Role: SCHOOL_ADMIN');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    
    if (error.message.includes('connect')) {
      console.log('\n💡 Connection failed. Try these alternatives:');
      console.log('1. Use Railway CLI: railway run node scripts/setup-database.js');
      console.log('2. Use a PostgreSQL client with these details:');
      console.log('   Host: Check Railway dashboard for TCP proxy domain');
      console.log('   Port: Check Railway dashboard for public port');
      console.log('   Database: railway');
      console.log('   User: postgres');
      console.log('   Password: rtNZicRKWcwZnodkqRljCIuIpZBglhth');
    }
  } finally {
    await client.end();
  }
}

setupDatabase();