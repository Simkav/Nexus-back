import { connect } from 'mongoose'
// TODO add parse models and import
const arr = ['./Book/book.model', './User/user.model', './Quote/quote.model']

const init = async () => {
  try {
    await connect(process.env.MONGO_CONNECT_URL)
    await Promise.all(arr.map(module => import(module)))
    console.log('Mongoose connected')
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}

export default init
