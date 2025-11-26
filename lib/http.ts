import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GITHUB_API_URL || 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
  timeout: 10000,
});
