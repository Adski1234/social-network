'use client';
import Link from 'next/link';
import { Show, SignOutButton, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className='bg-black border-b px-8 py-4 flex justify-between items-center'>
      <Link href='/' className='text-xl font-bold'>Anti-Social Network</Link>
      <div className='flex gap-4 items-center'>
        <Show when='signed-in'>
          <Link href='/profile'>Profile</Link>
          <SignOutButton />
          <UserButton />
        </Show>
        <Show when='signed-out'>
          <Link href='/sign-in'>Sign In</Link>
          <Link href='/sign-up'>Sign Up</Link>
        </Show>
      </div>
    </nav>
  );
}