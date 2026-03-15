'use client';

export default function Error({ error, reset }) {
  return (
    <main className='p-8 text-center'>
      <h1 className='text-4xl font-bold mb-4'>Something went wrong</h1>
      <p className='mb-6 text-gray-600'>{error?.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={reset}
        className='bg-blue-600 text-white px-4 py-2 rounded'
      >
        Try again
      </button>
    </main>
  );
}