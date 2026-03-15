'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import * as Avatar from '@radix-ui/react-avatar';
import * as Separator from '@radix-ui/react-separator';

export default function ProfilePage() {
  const { user } = useUser();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [saved, setSaved] = useState(false);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(d => {
      if (d) { setUsername(d.username || ''); setBio(d.bio || ''); }
    });
    fetch('/api/posts').then(r => r.json()).then(setPosts);
  }, []);

  async function handleSave() {
    await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, bio }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handlePost() {
    if (!content.trim()) return;
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const newPost = await res.json();
    setPosts([newPost, ...posts]);
    setContent('');
  }

  return (
    <main className='p-8 max-w-lg mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>My Profile</h1>
      <Avatar.Root className='inline-flex items-center justify-center
  w-16 h-16 rounded-full bg-blue-200 mb-4'>
  <Avatar.Image
    src={user?.imageUrl}
    alt='Profile avatar'
    className='w-full h-full rounded-full object-cover'
  />
  <Avatar.Fallback className='text-xl font-bold text-blue-800'>
    {username ? username[0].toUpperCase() : '?'}
  </Avatar.Fallback>
    </Avatar.Root>
      <p className='mb-4 text-gray-500'>{user?.emailAddresses[0]?.emailAddress}</p>

      <label className='block mb-2 font-semibold'>Username</label>
      <input className='border rounded p-2 w-full mb-4'
        value={username} onChange={e => setUsername(e.target.value)} />

      <label className='block mb-2 font-semibold'>Bio</label>
      <textarea className='border rounded p-2 w-full mb-4' rows={3}
        value={bio} onChange={e => setBio(e.target.value)} />

      <button onClick={handleSave}
        className='bg-blue-600 text-white px-4 py-2 rounded mb-8'>
        Save Profile
      </button>
      {saved && <p className='text-green-600 mt-2'>Saved!</p>}

      <Separator.Root className='bg-gray-200 h-px my-8' />
      <h2 className='text-xl font-bold mb-4'>My Posts</h2>

      <textarea className='border rounded p-2 w-full mb-2' rows={3}
        placeholder='What is on your mind?'
        value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={handlePost}
        className='bg-green-600 text-white px-4 py-2 rounded mb-6'>
        Post
      </button>

      <div className='space-y-4'>
        {posts.map(post => (
          <div key={post.id} className='border rounded p-4'>
            <p>{post.content}</p>
            <p className='text-xs text-gray-400 mt-2'>
              {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}