// create express server

const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'palmie',
    database: 'crud_database',
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// 4 methods for HTTP requests

app.get('/api/get', (req, res) => {
  const sqlSelect = 
    "SELECT * from movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
})

app.delete('/api/delete/:movieName', (req, res) => {
  const name = req.params.movieName
  const sqlDelete = 
  "DELETE FROM movie_reviews WHERE movieName = ?";
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err)
  })
})

app.put('/api/update', (req, res) => {
  const name = req.body.movieName
  const review = req.body.movieReview
  const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?"
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err)
  })
})


app.post('/api/insert', (req, res) => {

  // getting stuff from front end Axios post
  const movieName = req.body.movieName
  const movieReview = req.body.movieReview

  const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(err)
  })
})

// what will display if I choose localhost:5000/about
app.get('/about', (req, res) => {
    res.send('My name is Davis.')
  })

app.listen(5000, () => {
  console.log(`Listening!`)
})