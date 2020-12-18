import axios from 'axios'

const api_key = 'b82c172e7bf6660516881c6a1ed616dd'

const movieApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key
})

export default movieApi