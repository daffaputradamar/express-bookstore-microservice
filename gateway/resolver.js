const axios = require('axios')

const resolver = {
    getBooks: async function () {
        let { data } = await axios.get('http://localhost:4545/books')
        return data
    },
    getCustomers: async function () {
        let { data } = await axios.get('http://localhost:5555/customers')
        return data
    }
  }
  
  module.exports = resolver