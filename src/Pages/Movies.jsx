import React, { useEffect, useState } from 'react'
import './Movies.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import backgroundPicture from '../Assets/Background.png'
import background from '../Assets/Movies-background.png'
import { Link} from 'react-router-dom'
import logo from '../Assets/Movie-Production-logo .avif'


const Movies = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('q') || '';

  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false); 

    const loadMovies = async () => {
        if (searchTerm.trim() === '') {
            setMovies([]);
            return;
        }
        setLoading(true);
            
            try {
                const response = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchTerm}`);
                const data = await response.data;
                
                if (data.Response === 'True') {
                    let results = data.Search.slice(0, 12);
                    if (filter) {
                      results = applyFilter(results, filter);
                  }
                  
                  setMovies(results);
              } else {
                  setMovies([]);
              }
          } catch (error) {
              console.error("Error fetching movies:", error);
          } finally {
              setLoading(false);
          }
      };

    const applyFilter = (movies, filter) => {
        const sorted = [...movies];
      switch (filter) {
          case 'OLD_TO_NEW':
              return movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
          case 'NEW_TO_OLD':
              return movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
          default:
              return sorted;
      }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSearchTriggered(false);
};
const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchTerm.trim().length > 0) {
        setSearchTriggered(true);
        loadMovies(searchTerm.trim()); 
    }
  };

const handleFilterChange = (event) => {
    setFilter(event.target.value);
};

useEffect(() => {
    if (initialSearch.trim().length > 0) {
        setSearchTerm(initialSearch);
        setSearchTriggered(true);
        loadMovies(initialSearch.trim());
        navigate('/movies', { replace: true });
      }
    }, []);

    useEffect(() => {
        if (movies.length > 0 && filter) {
          const sorted = applyFilter([...movies], filter);
          setMovies(sorted);
        }
      }, [filter]);

return (
  <div className="container"
  style={{backgroundImage: `url(${backgroundPicture})`, backgroundSize: 'cover', backgroundPosition:'center', minHeight: '100vh',position: 'relative' }}> 
<div className="header"
  style={{
    backgroundImage: `url(${background})`,
  }}>
<div className="header__title">
  <div className="logo__container">
      <img src={logo} alt="" className="logo"/>
  </div>
  <div className="links">
      <Link to = "/"
      style={{color:"#fff", fontSize:"18px", fontWeight:"600", textDecoration:"none",
      }}>Home</Link>   
      <Link to = "/movies"
      style={{color:"#fff", fontSize:"18px", fontWeight:"600", textDecoration:"none",
      }}>Movies</Link>   
      <Link to = "/contacts"
      style={{color:"#fff", fontSize:"18px", fontWeight:"600", textDecoration:"none",
      }}>Contact</Link>   
  </div>
</div>
<div className="content__wrapper">
  <h1>
      Explore Our Movie Library
  </h1>
  <div className="input__wrap" >
          <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search for movies..."
          />
          </div>
          <div className="filter__wrap" >
          <select onChange={handleFilterChange} className="movies__filter">
              <option value="">Sort by</option>
              <option value="OLD_TO_NEW">Old to New</option>
              <option value="NEW_TO_OLD">New to Old</option>
          </select>
          </div>
      </div>
       </div>
      { loading ? (
          <div className="movies__loading">Loading...</div>
      ) : (
          <div className="movies__grid">
              {movies.length > 0 ? (
                  movies.map((movie) => (
                      <div key={movie.imdbID} className="movie__card">
                          <img src={movie.Poster} alt={movie.Title} className="movie__img" />
                          <div className="movie__info">
                              <h3 className="movie__title">{movie.Title}</h3>
                              <p className="movie__year">{movie.Year}</p>
                          </div>
                      </div>
                  ))
              ) : (searchTriggered && (
                  <p className='no__results'>No movies found. Try a different search term.</p> )
              )}
          </div>
      )}
  </div>
);
};

export default Movies;
