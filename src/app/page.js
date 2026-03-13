'use client';
import { Show, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='p-8'>
      <h1 className='text-3xl font-bold mb-4'>Social Network</h1>
      <Show when='signed-out'>
        <p className='mb-4'>Please sign in to continue.</p>
        <SignInButton mode='modal' />
      </Show>
      <Show when='signed-in'>
        <p className='mb-4'>Welcome!</p>
        <nav className='flex gap-4 mt-4'>
          <Link href='/profile'>My Profile</Link>
          <SignOutButton />
        </nav>
        <UserButton />
      </Show>
    </main>
  );
}

