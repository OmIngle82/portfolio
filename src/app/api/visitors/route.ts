import { NextResponse } from 'next/server';
import Redis from 'ioredis';

// Standard Node.js runtime is required for ioredis socket connections
export const runtime = 'nodejs';

// Initialize Redis only if the environment variable exists
const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

export async function GET(request: Request) {
  try {
    // Graceful fallback if database is not configured
    if (!redis) {
      return NextResponse.json({ count: 1204, fallback: true });
    }

    // Parse the requested action
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    let count: string | number | null = 0;

    if (action === 'get') {
      // Just fetch the current count without incrementing
      count = await redis.get('portfolio_visitor_count');
    } else {
      // Increment the visitor count
      count = await redis.incr('portfolio_visitor_count');
    }
    
    return NextResponse.json({ count: Number(count) || 0, fallback: false });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    // Return a safe fallback number on error
    return NextResponse.json({ count: 1204, fallback: true });
  }
}
