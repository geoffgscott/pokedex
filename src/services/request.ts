import axios from 'axios'

const BASE_URL = import.meta.env.VITE_POKE_BASE_URL as string
if (!BASE_URL || typeof BASE_URL !== 'string') throw new Error('Missing API Url in environment')

/** Create base request instance for future expansion */
export const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
