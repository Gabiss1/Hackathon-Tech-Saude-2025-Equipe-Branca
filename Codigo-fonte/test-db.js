require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@libsql/client');

console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('TURSO_TOKEN:', process.env.TURSO_TOKEN ? 'SET' : 'NOT SET');

async function testConnection() {
  try {
    const client = createClient({
      url: process.env.DATABASE_URL,
      authToken: process.env.TURSO_TOKEN,
    });

    const result = await client.execute('SELECT * FROM paciente LIMIT 5');
    console.log('Connection successful!');
    console.log('Sample data:', result.rows);
  } catch (error) {
    console.error('Connection failed:', error.message);
  }
}

testConnection();
