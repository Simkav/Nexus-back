import dotenv from 'dotenv'
dotenv.config()
import mongooseInit from './mongoose'
import server from './server'

const PORT = +process.env.PORT || 3000

const init = async () => {
  await mongooseInit()
  server.listen(PORT, () => {
    console.log(`server started on PORT: ${PORT}`)
  })
}

init()
