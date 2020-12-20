import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import AuthContext from "./Context/AuthContext";
import instance from "./db/axios";
import User from "./Model/User";
import Details from "./Model/Details";
import AuthState from "./Model/AuthState";

const API_USERS = '/people'

// lazy initialaztion

const LoginPage = lazy(() => import("./Authorization/Login"))
const RegistrationPage = lazy(() => import("./Authorization/Register"))
const MoviesPage = lazy(() => import("./MoviesList/Movies"))
const AccountPage = lazy(() => import("./Authorization/Account"))
const NavigationBar = lazy(() => import("./navigation/Navbar"))
const MovieDetailsPage = lazy(() => import("./MovieDetails/MovieDetails"))
const FavouritesPage = lazy(() => import("./FavouritesMovies/Favourites"))

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
      // TODO handle case when the user is already registered
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
          <Suspense fallback={<h1>Loading Route ...</h1>}>
            <NavigationBar />
              <div className="container">
                  <Switch>
                    <Route path="/" exact component={MoviesPage} />

                    <Route path="/login">
                      <LoginPage login={authenticateUser} />
                    </Route>

                    <Route path="/register">
                      <RegistrationPage lastIndex={users.length} register={registerUser} />
                    </Route>

                    <Route path="/account">
                      <AccountPage logout={logoutUser} />
                    </Route>
                    
                    <Route path="/favourites">
                      <FavouritesPage />
                    </Route>

                    <Route path="/:id">
                      <MovieDetailsPage add={addToFavourites} />
                    </Route>

                  </Switch>
              </div>
            </Suspense>
        </Router>
      </AuthContext.Provider>
  );
}
export default App;
