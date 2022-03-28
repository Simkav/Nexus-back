import { connect } from 'mongoose'

const init = async () => {
  try {
    await connect(process.env.MONGO_CONNECT_URL || '')
    console.log('Mongoose connected')
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}

export default init
