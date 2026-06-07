/**
 * Centralized API configuration
 * Uses NEXT_PUBLIC_API_URL env var in production,
 * falls back to localhost:5000 for local development.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com';

export default API_BASE;
