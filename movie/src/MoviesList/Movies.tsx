import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import findMovieApi from '../Api/FindMovieApi'
import movieApi from '../Api/MovieApi'
import Movie from '../Model/Movie'
import FindMovies from './FindMovies'
import './Movies.css'

function Movies(): ReactElement {
    console.log("Movies")
    const [movies, setMovies] = useState<any[]>([])
    const [query, setQuery] = useState('')
    

    useEffect(() => {
        async function fetchMovies() {
            const response = await movieApi.get('')
            console.log(response)
            const movies = response.data.results
            setMovies(movies)
        }
        fetchMovies()
    }, [])
    
    useEffect(() => {
        async function find() {
            const response = await findMovieApi.get(query)
            const movies = response.data.results
            setMovies(movies)
        }
        find()
    }, [query])

    function getVoteAverageClass(average: number):string {
        if (average > 7)
            return 'green-title'
        if (average >= 5)
            return 'yellow-title'
        return 'red-title'
    }

    return (
        <div className='movies-page-container'>
            <div className="search-container">
                <input type='text' placeholder='query' onChange={(e)=>setQuery(e.target.value)}></input>
            </div>
            <div className={'movies-container'}>
                {movies && movies.map(({id, title, poster_path, vote_average}) => (
                <Link to={'/'+id} key={id} className={'movie-item'} >
                    <div className={'movie-item-image-container'}>
                        <img className={'movie-item-image'} src={'https://image.tmdb.org/t/p/w500' + poster_path} />
                    </div>
                    <div className={'movie-item-title-container'}>
                        <h3 className={'movie-item-title'}>{title}</h3>
                        <h4 className={getVoteAverageClass(vote_average)}>{vote_average}</h4>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    )
}

export default Movies