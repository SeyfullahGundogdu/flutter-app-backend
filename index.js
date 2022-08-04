const express = require('express')
const db = require('./queries')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.post('/register', db.registerUser)
app.post('/signin', db.signIn)
app.get('/getposts/:id',db.getPosts)
app.get('/getposts/*/:post_title',db.getFilteredPosts)
app.post('/addpost/:id',db.addPost)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })