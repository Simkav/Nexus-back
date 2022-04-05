import { Types } from 'mongoose'
import { IBook, IBookComment } from './Book/book.interface'
import { BookModel } from './Book/book.model'
import BookService from './Book/book.service'
import UserService from './User/user.service'
const userService = new UserService()
const bookService = new BookService()
const test = async () => {
  const user = await userService.findUserByEmail('admin@gmail.com')

  const populatedUser = await bookService.populateUserBooks(user)
  const testBook = populatedUser.books

//   const ids = [
//     '62434b6549f11567ac8d2cbe',
//     '62434b4843dbde63cee9444a',
//     '62434b2a9735e2f93ca13c14',
//     '62434b0838be712ea634b3bf',
//     'test'
//   ]

//   for (const id of ids) {
//     console.log(await testBook.deleteComment(id))
//   }

  //   const test = await user.populate('books')
  //   const book = test.books[0]

  //   console.log(test.books[0].comments)

  //   //   test.books[0].comments = test.books[0].comments.filter(el => {
  //   //     console.log(el._id.toString() === '6242f13d7d62f92afae128c1')
  //   //     return el._id.toString() === '6242f13d7d62f92afae128c1'
  //   //   })
  //   test.books[0].comments.push({
  //     _id: new Types.ObjectId(),
  //     text: 'Third comment'
  //   })
  //   console.log(test.books[0].comments, 'updated')
  //   await test.save()
  //   //   await test.books[0].save()
  //   console.log(test)

  //   test.books.filter(book =>
  //     book.comments.includes(
  //       el => el._id === new ObjectId('6242f13d7d62f92afae128c1')
  //     )
  //   )
  //   console.log(test.books.map(book => book.comments))
}

test()
