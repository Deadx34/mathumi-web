"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#fdf5eb] z-10 w-full relative">
      <div className="gold-panel p-6 sm:p-8 w-full max-w-sm sm:max-w-md shadow-2xl relative z-10 border-2 border-[#d4af37]">
        <div className="flex justify-center mb-4">
          <img 
            src="/logo.png" 
            alt="Mathumi Logo" 
            className="object-cover h-20 w-20 rounded-full border-2 border-[#d4af37] shadow-md" 
          />
        </div>
        <h2 className="text-3xl font-bold text-[#4a2511] mb-6 text-center uppercase tracking-wider font-serif">Admin Login</h2>
        {error && <p className="text-red-500 mb-4 text-center font-semibold bg-red-100 p-2 rounded">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#4a2511]">Username</label>
            <input 
              type="text" 
              required
              className="w-full p-3 border border-[#d4af37] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#cba135] text-[#4a2511]"
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#4a2511]">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-3 border border-[#d4af37] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#cba135] text-[#4a2511]"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className="gold-button w-full py-3 mt-4 text-lg uppercase tracking-wide">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

