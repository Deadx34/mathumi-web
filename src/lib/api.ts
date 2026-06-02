/**
 * Centralized API configuration
 * Uses NEXT_PUBLIC_API_URL env var in production,
 * falls back to localhost:5000 for local development.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default API_BASE;
