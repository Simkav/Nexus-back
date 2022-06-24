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
      if (!requestOrigin || whitelist.indexOf(requestOrigin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
)

server.use('/api', Router)

server.use(errorHandling)

export default server
