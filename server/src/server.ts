import express from 'express'
import errorHandling from './errorHandling'
import Router from './router'
const server = express()
server.use(express.json())

server.use('/api',Router)

server.use(errorHandling)

export default server
