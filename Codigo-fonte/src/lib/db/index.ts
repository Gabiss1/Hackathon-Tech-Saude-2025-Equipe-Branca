import 'server-only';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL || !process.env.TURSO_TOKEN) {
  throw new Error('DATABASE_URL and TURSO_TOKEN environment variables are required');
}

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.TURSO_TOKEN,
});

export const db = drizzle(client, { schema });
