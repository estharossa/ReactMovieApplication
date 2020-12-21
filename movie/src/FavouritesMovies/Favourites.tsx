import React, {Fragment, ReactElement, useContext, useEffect, useReducer, useState} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../Context/AuthContext'
import '../MoviesList/Movies.css'
import {useSelector} from "react-redux";
import AuthState from "../Model/AuthState";

export default function Favourites(): ReactElement {
    // const authState = useContext(AuthContext)
    const authState = useSelector<AuthState>((state: AuthState) => state) as AuthState

    const movies = authState.user?.favourites

    console.log(authState)

    function getVoteAverageClass(average: number): string {
        if (average > 7)
            return 'green-title'
        if (average >= 5)
            return 'yellow-title'
        return 'red-title'
    }

    return (
        <div className='movies-page-container'>
            <div className={'movies-container'}>
                {movies && movies.map(({id, title, poster_path, vote_average}) => (
                    <Fragment key={id}>
                        <Link to={'/' + id} className={'movie-item'}>
                            <div className={'movie-item-image-container'}>
                                <img className={'movie-item-image'}
                                     src={'https://image.tmdb.org/t/p/w500' + poster_path}/>
                            </div>
                            <div className={'movie-item-title-container'}>
                                <h3 className={'movie-item-title'}>{title}</h3>
                                <h4 className={getVoteAverageClass(vote_average)}>{vote_average}</h4>
                            </div>
                        </Link>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
