const express = require("express")
const expressGraphql = require("express-graphql")
const schema = require("./schema")
const rootValue = require("./resolver")

const app = express()
app.use("/graphql", expressGraphql({
  schema,
  rootValue,
  graphiql: true
}))

app.listen(3000)