import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import AuthContext from '../Context/AuthContext';
import Details from '../Model/Details';
import fetchMovieDetails from './FetchMovieDetails';
import './MovieDetails.css'

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

interface Props {
  add: (details: Details) => void
}

export default function MovieDetails({ add }: Props): ReactElement {
    const match = useRouteMatch<{ id: string }>();
    const source = 'https://api.themoviedb.org/3/movie/'+match.params.id+'?api_key=b82c172e7bf6660516881c6a1ed616dd'
    const { loading, result, error } = fetchMovieDetails({dataSource: source});
    const authState = useContext(AuthContext)

    if (loading || error) {
        return loading ? "Loading..." : error;
    }

    function addToFavourites() {
      add(result)
    }

    return (
        <div className={'movie-details-container'}>
          <div className={'movie-details-mini-container'}>
            <div className={'movie-img-container'}>
              <img src={IMAGE_URL+result.poster_path} alt="movie"/>
            </div>
            <div className={'movie-text-container'}>
              <h2>{result.title}</h2>
              <h3><span className={'movie-text'}>Rating:</span> {result.vote_average}</h3>
              <p><span className={'movie-text'}>Overview:</span><br/>{result.overview}</p>
              {authState.isLogged && authState.user?.favourites.find((movie) => movie.id === result.id) == null ? <button onClick={() => addToFavourites()}>Add to Favourites</button> : null}
              {authState.isLogged && authState.user?.favourites.find((movie) => movie.id === result.id) != null ? <h3 className={'favourite-text'}>This film is already in favourite movies list</h3> : null}
            </div>
          </div>
        </div>
      );
}