import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './Search.svg';
import MovieCard from "./MovieCard";

//API_Key: 3ccc230f

const API_KEY = '3ccc230f';


const App = () => {
    const [movies, setMovies] =useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // const [page, setPage] = useState(1)

    const searchMovies = async (title) => {
        const response = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`);
        const data = await response.json();
        
        setMovies(data.Search);
        console.log(data.Search);
    }

    const submitSearch = (e) =>{
        e.preventDefault();
        searchMovies(e.target.querySelector('input').value);
    }

    useEffect(() => {
        searchMovies('Avengers');
    }, [searchTerm])

    return (
        <div className="app">
            <h1>MovieApp</h1>
            <form className="search" onSubmit={(e)=>{submitSearch(e)}}>
                <input 
                    placeholder="Search for movies" 
                    value={searchTerm}
                    onChange={(e)=>{
                        setSearchTerm(e.target.value);
                    }}
                />
                <img 
                    src={SearchIcon} 
                    alt="search"
                    onClick={()=> searchMovies(searchTerm)}
                />
            </form>

            {movies?.length > 0
            ? (
                <div className="container">
                    {
                        movies.map( (movie) => (
                            <MovieCard movie={movie} key={movie.imdbID}/>
                        ))
                    }
                </div>
            )
            : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}

            {/* <div className="container">
                <button onClick={console.log('prev clicked')}>Prev</button>
                <button onClick={console.log('next clicked')}>Next</button>
            </div> */}
        </div>
    )
};

export default App;