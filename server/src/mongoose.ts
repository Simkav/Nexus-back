import { connect } from 'mongoose'
import parseModels from './utils/parseModels'

const init = async () => {
  try {
    console.log('connecting to mongo')
    await connect(process.env.MONGO_CONNECT_URL)
    await parseModels()
    console.log('Mongo connected')
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}

export default init
