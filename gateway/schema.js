const { buildSchema } = require("graphql")

const schema = buildSchema(`
  type Book {
    _id: ID
    title: String
    author: String
    numberPages: Int
    publisher: String
  }

  type Customer {
    _id: ID
    name: String
    age: Int
    address: String
  }

  type Query {
    getBooks: [Book]
    getCustomers : [Customer]
  }
`)

module.exports = schema