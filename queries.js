const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'flutter_db',
  password: 'admin',
  port: 5432,
})

const signIn = (request, response) => {
  const { email, password } = request.body
  pool.query('SELECT * FROM users WHERE email= $1 AND password = $2', [email, password], (error, results) => {
    if (error) {
      return response.status(400).send(error.message)}
    if (results.rowCount == 0) {
      return response.status(404).send("No user with specified credentials.")
    }
    return response.status(200).json(results.rows)
  })
}

const registerUser =(request, response) => {
  const { accMail, accPass} = request.body
  if (!(accMail || accPass)) {
    return response.status(400).send('email or password empty, fill in the necessary fields.')
  }
  pool.query('INSERT INTO Accounts(accMail, accPass) VALUES ($1, $2)', [accMail, accPass], (error, results) => {
    if (error) {
      return response.status(400).send(error.message)
    }
    response.status(200).json(results.rows)
  })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
      if (error) {
        return response.status(400).send(error.message)
      }
      response.status(200).json(results.rows)
    })
  }
  const getPosts = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM posts WHERE user_id=$1 ORDER BY post_date DESC',[id], (error, results) => {
      if (error) {
        return response.status(400).send(error.message)
      }
      response.status(200).json(results.rows)
    })
  }

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        return response.status(400).send(error["message"])
      }
      response.status(200).json(results.rows)
    })
}
const createUser = (request, response) => {
    const { name, email, phone_number, password } = request.body
    pool.query(
      'INSERT INTO users (name, email, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone_number, password], (error, results) => {
      if (error) {
        return response.status(400).send("-1")
      }
      response.status(201).send(`${results.rows[0].user_id}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email, phonenumber, password } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2, phonenumber = $3, password = $4 WHERE id = $5',
      [name, email, phonenumber, password, id],
      (error, results) => {
        if (error) {
          return response.status(400).send(error["message"])
        }
        response.status(200).send(`${results.rowCount} row(s) has/have been updated.`)
      }
    )
}
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        return response.status(400).send(error["message"])
      }
      response.status(200).send(`${results.rowCount} row(s) deleted.`)
    })
}
module.exports = {
    registerUser,
    signIn,
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getPosts
}