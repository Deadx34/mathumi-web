/**
 * Centralized API configuration
 * Uses NEXT_PUBLIC_API_URL env var in production,
 * falls back to the production backend URL if the env var is not set.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://api.mathumibridal.com');

export default API_BASE;
