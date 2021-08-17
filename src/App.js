import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    // async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://swapi.dev/api/films/`);

      // check request status before parsing the response
      if (!response.ok) {
        throw new Error('Something went wrong.');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      // console.log(error.message);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  // function fetchMoviesHandler() {
  //   fetch(`https://swapi.dev/api/films/`)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       const transformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           releaseDate: movieData.release_date,
  //           openingText: movieData.opening_crawl,
  //         };
  //       });
  //   setMovies(transformedMovies);
  // });
  // }

  // move this below fetchMoviesHandler, since when we changed it to arrow fct with const, we lost the hoisting that the function definition afforded us
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>There is a disturbance in the force (no movies found).</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading movies...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && !error && movies.length === 0 && (
          <p>There is a disturbance in the force (no movies found).</p>
        )}
        {isLoading && <p>Loading movies...</p>}
        {!isLoading && error && <p>{`${error}`}</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
