import express from 'express'
import errorHandling from './errorHandling'
import Router from './router'
const server = express()
server.use(express.json())

server.use(Router)

server.use(errorHandling)

export default server
