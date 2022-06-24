import express from 'express'
import errorHandling from './errorHandling'
import Router from './router'
import cors from 'cors'
const server = express()
server.use(express.json())

const whitelist = ['https://nexus-sim.pp.ua', 'http://localhost:3000']
server.use(
  cors({
    origin (requestOrigin, callback) {
      !requestOrigin || whitelist.some(origin => origin === requestOrigin)
        ? callback(null, true)
        : callback(new Error('Not Allowed by CORS'))
    }
  })
)

server.use('/api', Router)

server.use(errorHandling)

export default server
