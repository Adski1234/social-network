'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setProfile(data);
          setUsername(data.username || '');
          setBio(data.bio || '');
        }
      });
  }, []);

  async function handleSave() {
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, bio }),
    });
    const data = await res.json();
    setProfile(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <main className='p-8 max-w-lg mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>My Profile</h1>
      <p className='mb-4 text-gray-500'>Signed in as: {user?.emailAddresses[0]?.emailAddress}</p>

      <label className='block mb-2 font-semibold'>Username</label>
      <input
        className='border rounded p-2 w-full mb-4'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <label className='block mb-2 font-semibold'>Bio</label>
      <textarea
        className='border rounded p-2 w-full mb-4'
        rows={4}
        value={bio}
        onChange={e => setBio(e.target.value)}
      />

      <button
        onClick={handleSave}
        className='bg-blue-600 text-white px-4 py-2 rounded'
      >
        Save Profile
      </button>
      {saved && <p className='text-green-600 mt-2'>Saved!</p>}
    </main>
  );
}