import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from "./Authorization/Login";
import Register from "./Authorization/Register";
import AuthContext from "./Context/AuthContext";
import instance from "./db/axios";
import Movies from "./MoviesList/Movies";
import User from "./Model/User";
import NavBar from './navigation/Navbar';
import Account from "./Authorization/Account";
import MovieDetails from "./MovieDetails/MovieDetails";
import Details from "./Model/Details";
import AuthState from "./Model/AuthState";
import Favourites from "./FavouritesMovies/Favourites";

const API_USERS = '/people'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [isLogged, setIsLogged] = useState<AuthState>({isLogged: false})

  useEffect(() => {
    async function fetchUsers() {
      const result = await instance.get(API_USERS)
      setUsers([...result.data])
    }

    fetchUsers()
  }, [])

  function authenticateUser(username: string, password: string) {
    const isPresent = users.find((user) => user.username === username && user.password === password) != null
    const user = users.find((user) => user.username === username && user.password === password)
    if (isPresent) {
      setIsLogged({isLogged: isPresent, user: user})
    }
    else {
      setIsLogged({isLogged: isPresent})
    }
  }

  async function registerUser(user: User) {
    const isPresent = users.find((u) => u.username === user.username && u.password === user.password) != null
    if (isPresent) {
      return
    }
    const result = await instance.post(API_USERS, user)
    setIsLogged({isLogged: true, user: user})
  }

  async function addToFavourites(movieDetails: Details) {
    let id = isLogged.user?.id
    let user = isLogged.user
    let isMoviePresent = user?.favourites.find((movie) => movie.id === movieDetails.id) != null
    if(!isMoviePresent) {
      user?.favourites.push(movieDetails)
      const response = await instance.patch(`${API_USERS}/${id}`, user)
    }  
  }

  function logoutUser() {
    setIsLogged({isLogged: false})
  }
  
  return (
      <AuthContext.Provider value={isLogged}>
        <Router>
          <NavBar />
          <div className="container">
            <Suspense fallback={<h1>Loading Route ...</h1>}>
              <Switch>
                <Route path="/" exact component={Movies} />

                <Route path="/login">
                  <Login login={authenticateUser}></Login>
                </Route>

                <Route path="/register">
                  <Register lastIndex={users.length} register={registerUser}></Register>
                </Route>

                <Route path="/account">
                  <Account logout={logoutUser}></Account>
                </Route>
                
                <Route path="/favourites">
                  <Favourites></Favourites>
                </Route>

                <Route path="/:id">
                  <MovieDetails add={addToFavourites}></MovieDetails>
                </Route>


              </Switch>
            </Suspense>
          </div>
        </Router>
      </AuthContext.Provider>
  );
}
export default App;
