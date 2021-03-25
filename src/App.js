import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import classes from './App.module.css'
import { movies } from './Components/Constants'
import { toast } from 'react-toastify'
import _ from 'lodash'

const App = () => {
  const [originalMovies, setoriginalMovies] = useState([])
  const [filteredMovies, setfilteredMovies] = useState([])
  const [previousMoviesList, setpreviousMoviesList] = useState([])
  const [multiplier, setmultiplier] = useState(0)

  useEffect(() => {

    setoriginalMovies(movies)
    setfilteredMovies(movies)
    setpreviousMoviesList(movies)

  }, [])

  const handleChange = (e) => {
    var input = e.target.value
    if (input === '') {
      setfilteredMovies(originalMovies)
    }
    else {
      var list = []
      var length = originalMovies.length
      for (var i = 0; i < length; i++) {
        if (originalMovies[i]['A'].toLowerCase().includes(input.toLowerCase())) {
          list.push(originalMovies[i])
        }
      }
      setfilteredMovies(list)
    }
  }
  const applyFactor = (e) => {
    if (multiplier === '0' || multiplier === '' || multiplier <= 0) {
      alert("Enter a non-zero number for adjustment")
    }
    else {
      // var temp = originalMovies
      var temp = JSON.parse(JSON.stringify(originalMovies));
      temp.map(item => (
        item.D = item.C * multiplier
      ))
      setfilteredMovies(temp)
      var value = multiplier
      setmultiplier(value)
    }
  }
  const resetMultiplier = (e) => {
    setmultiplier(0)
    setoriginalMovies(previousMoviesList)
    setfilteredMovies(previousMoviesList)
    // search_bar
    document.getElementById('search_bar').value = ''

  }
  return (
    <div className="App">
      <div className={classes['container']}>
        <div className="row">
          <label className={classes['search-label']} for="search_bar"><u>Search</u></label>
          
          <input className={classes['search-bar']} id="search_bar" type="text" placeholder="Search by movie name" onChange={e => handleChange(e)} />
        </div>
        <div className={`${classes['adjustment-div']} row`}>
          <label className={classes['adjustment-label']} for="adjustment"><u>Adjustments</u></label><br />

          <input className={classes['adjustment-input']} id="adjustment" type="number" placeholder="enter adjustment value" value={multiplier} onChange={e => setmultiplier(e.target.value)} />

          <button className={`${classes['apply']} btn btn-success`} onClick={e => applyFactor(e)}>
            <i class="fa fa-check-circle" aria-hidden="true"></i> Apply
          </button>
          <button className={`${classes['reset']} btn btn-danger`} onClick={e => resetMultiplier(e)}>
            <i class="fa fa-refresh" aria-hidden="true"></i> Reset
          </button>
        </div>
        <div className="row">
          {/* table */}
          <div className={classes['table-container']}>
            <table style={{ width: '100%' }}>
              <thead>
                <th style={{ width: '50%' }}>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
                <th>E</th>
              </thead>
              <tbody>
                {filteredMovies.map((item, index) => (
                  <>
                    <tr>
                      <td>{item.A}</td>
                      <td>{item.B}</td>
                      <td>{item.C}</td>
                      <td>{item.D}</td>
                      <td>{item.E}</td>
                    </tr>
                    <hr style={{ width: '200%' }} />
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
