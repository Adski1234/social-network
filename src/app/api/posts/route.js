import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await pool.query(
    'SELECT * FROM posts WHERE clerk_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return NextResponse.json(result.rows);
}

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { content } = await request.json();
  if (!content) return NextResponse.json({ error: 'Content required' }, { status: 400 });

  const result = await pool.query(
    'INSERT INTO posts (clerk_id, content) VALUES ($1, $2) RETURNING *',
    [userId, content]
  );
  return NextResponse.json(result.rows[0]);
}