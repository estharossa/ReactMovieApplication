import axios from 'axios'

const api_key = 'b82c172e7bf6660516881c6a1ed616dd'

const findMovieApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/search/movie?api_key=b82c172e7bf6660516881c6a1ed616dd&language=en-US&query='
})

export default findMovieApi