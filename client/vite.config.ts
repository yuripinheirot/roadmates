import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig(() => {
  const env = process.env
  const customEnv = {} as Record<string, string>
  for (const key in env) {
    if (Object.prototype.hasOwnProperty.call(env, key)) {
      customEnv[`process.env.${key}`] = JSON.stringify(env[key])
    }
  }

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      ...customEnv,
    },
  }
})
