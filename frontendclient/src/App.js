import './App.css';
import React, { useState, useEffect } from "react"
import Axios from 'axios'

function App() {

  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')
  const [movieReviewList, setMovieList] = useState([])
  const [newReview, setNewReview] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:5000/api/get').then((response) => {
      console.log(response)
      console.log(response.data)
      setMovieList(response.data)
    })
  }, [])

  const submitReview = () => {
    Axios.post('http://localhost:5000/api/insert', 
    {movieName: movieName, movieReview: review})
      
    setMovieList([
      ...movieReviewList, {movieName: movieName, movieReview: review}
    ])
  }

  const deleteReview = (movie) => {
    // have to use `` weird quotes for variable input in url
    Axios.delete(`http://localhost:5000/api/delete/${movie}`)
  }

  const updateReview = (movie) => {
    Axios.put("http://localhost:5000/api/update", {
      movieName: movie,
      movieReview: newReview,
    })
    setNewReview('')
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className='form'>
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e) => {
          setMovieName(e.target.value)
        }} />
        <label>Review:</label>
        <input type="text" name="movieReview" onChange={(e) => {
          setReview(e.target.value)
        }} />
        <button onClick={submitReview}>Submit</button>
        {movieReviewList.map((val) => {
          return <div className='card'>
              <h1>
                {val.movieName}
              </h1>
              <p>
                {val.movieReview}
              </p>
              <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewReview(e.target.value)}}/>
              <button onClick={() => {updateReview(val.movieName)}}>Update Review</button>
            </div>
        })}
      </div>
    </div>
  );
}

export default App;
