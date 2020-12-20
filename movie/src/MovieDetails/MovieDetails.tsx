import React, {ReactElement, useContext, useEffect, useState} from 'react'
import {useRouteMatch} from 'react-router-dom'
import movieApi from '../Api/MovieApi';
import AuthContext from '../Context/AuthContext';
import Details from '../Model/Details';
import './MovieDetails.css'

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const DEFAULT_IMAGE_URL = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/space-movie-poster-design-template-18133e937d93002c68b4649ea234d75f_screen.jpg?ts=1573539500'

interface Props {
    add: (details: Details) => void
}

export default function MovieDetails({add}: Props): ReactElement {
    const match = useRouteMatch<{ id: string }>();
    const [movieDetails, setMovieDetails] = useState<Details>(
        {id: 0, title: "", poster_path: "", vote_average: 0, overview: ""}
    )
    const authState = useContext(AuthContext)
    const isPresent = !!authState.user?.favourites.find((movie) => movie.id == movieDetails.id)
    const [isAlreadyPresent, setIsAlreadyPresent] = useState<Boolean>(isPresent)
    const details_query = '3/movie/' + match.params.id + '?api_key=b82c172e7bf6660516881c6a1ed616dd'

    useEffect(() => {
        async function fetchMovieDetails() {
            const response = await movieApi.get(details_query)
            const result = response.data
            let details: Details = {
                id: result.id,
                title: result.title,
                poster_path: result.poster_path,
                vote_average: result.vote_average,
                overview: result.overview
            }
            setMovieDetails(result)
            setIsAlreadyPresent(!!authState.user?.favourites.find((movie) => movie.id == details.id))
        }

        fetchMovieDetails()
    }, [])

    function addToFavourites() {
        setIsAlreadyPresent(true)
        add(movieDetails)
    }

    return (
        <div className={'movie-details-container'}>
            <div className={'movie-details-mini-container'}>
                <div className={'movie-img-container'}>
                    <img
                        src={movieDetails.poster_path != null ? IMAGE_URL + movieDetails.poster_path : DEFAULT_IMAGE_URL}
                        alt='movie_poster'/>
                </div>
                <div className={'movie-text-container'}>
                    <h2>{movieDetails.title}</h2>
                    <h3><span className={'movie-text'}>Rating:</span> {movieDetails.vote_average}</h3>
                    <p><span className={'movie-text'}>Overview:</span><br/>{movieDetails.overview}</p>
                    {authState.isLogged && !isAlreadyPresent ?
                        <button onClick={() => addToFavourites()}>Add to Favourites</button> : null}
                    {authState.isLogged && isAlreadyPresent ?
                        <h3 className={'favourite-text'}>You have added the movie to your favourites list</h3> : null}
                </div>
            </div>
        </div>
    );
}