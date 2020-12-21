import React, {lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

const LoginPage = lazy(() => import("./Authorization/Login"))
const RegistrationPage = lazy(() => import("./Authorization/Register"))
const MoviesPage = lazy(() => import("./MoviesList/Movies"))
const AccountPage = lazy(() => import("./Authorization/Account"))
const NavigationBar = lazy(() => import("./navigation/Navbar"))
const MovieDetailsPage = lazy(() => import("./MovieDetails/MovieDetails"))
const FavouritesPage = lazy(() => import("./FavouritesMovies/Favourites"))

function App() {
    return (
        <Router>
            <Suspense fallback={<h1>Loading Route ...</h1>}>
                <NavigationBar/>
                <div className="container">

                    <Switch>
                        <Route path="/" exact component={MoviesPage}/>

                        <Route path="/login">
                            <LoginPage/>
                        </Route>

                        <Route path="/register">
                            <RegistrationPage/>
                        </Route>

                        <Route path="/account">
                            <AccountPage/>
                        </Route>

                        <Route path="/favourites">
                            <FavouritesPage/>
                        </Route>

                        <Route path="/:id">
                            <MovieDetailsPage/>
                        </Route>

                    </Switch>
                </div>
            </Suspense>
        </Router>
    );
}

export default App;
