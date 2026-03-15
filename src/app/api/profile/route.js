import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const result = await pool.query(
      'SELECT * FROM users WHERE clerk_id = $1',
      [userId]
    );
    return NextResponse.json(result.rows[0] || null);
  } catch (err) {
    console.error('Profile GET error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { username, bio } = await request.json();

    const result = await pool.query(
      `INSERT INTO users (clerk_id, username, bio)
       VALUES ($1, $2, $3)
       ON CONFLICT (clerk_id)
       DO UPDATE SET username = $2, bio = $3
       RETURNING *`,
      [userId, username, bio]
    );
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error('Profile POST error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
