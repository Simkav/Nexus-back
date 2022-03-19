import express from 'express'
import errorHandling from './errorHandling'
import { UserRouter } from './User/user.controller'
const server = express()
server.use(express.json())

server.use('/user', UserRouter)

server.use(errorHandling)

export default server
