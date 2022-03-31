declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      JWT_SECRET: string
      MONGO_CONNECT_URL: string
      PORT: string
    }
  }
}

export {}