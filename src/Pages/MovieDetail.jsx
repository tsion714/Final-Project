import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css';
import backgroundPicture from '../Assets/Background.png'


const MovieDetail = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const searchTerm = location.state?.fromSearch || '';

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}&plot=full`
        );
        setMovie(res.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie || movie.Response === "False") return <p>Movie not found</p>;

  return (
    <div className="container"
        style={{backgroundImage: `url(${backgroundPicture})`, backgroundSize: 'cover', backgroundPosition:'center', minHeight: '100vh',position: 'relative' }}> 
    <div className="movie-detail">
      <Link to="/movies" className="back-button">← Back to Movies</Link>
      <h1>{movie.Title} ({movie.Year})</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p className="movie-genre"><strong>Genre:</strong> {movie.Genre}</p>
        <p className="movie-director"><strong>Director:</strong> {movie.Director}</p>
        <p className="movie-actors"><strong>Actors:</strong> {movie.Actors}</p>
        <p className="movie-rating"><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
        <p className="movie-plot"><strong>Plot:</strong> {movie.Plot}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
