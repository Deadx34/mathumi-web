/**
 * Centralized API configuration
 * Uses NEXT_PUBLIC_API_URL env var in production,
 * falls back to the production backend URL if the env var is not set.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com';

export default API_BASE;
