import React,{ useState} from "react";
import "./Home.css"
import { Link, useNavigate } from 'react-router-dom'
import logo from '../Assets/Movie-Production-logo .avif'
import moviePoster from '../Assets/Movie-poster.mp4'
import backgroundPicture from '../Assets/Background.png'


const Home = () => {
    const navigate = useNavigate(); 
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false); 

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && searchTerm.trim().length > 0) {
          navigate(`/movies?q=${searchTerm.trim()}`);
        }
      };
    

    return (
        <div className="container"
        style={{backgroundImage: `url(${backgroundPicture})`, backgroundSize: 'cover', backgroundPosition:'center', minHeight: '100vh',position: 'relative' }}> 
     {menuOpen && (
            <div className="menu-overlay" onClick={() => setMenuOpen(false)}> 
            </div>
          )}
           <div className="header">
    <div className="header__title">
        <div className="logo__container">
            <img src={logo} alt="" className="logo"/>
        </div>
        <button
         className="hamburger-button"
            onClick={() => setMenuOpen((prev) => !prev)}>
            ☰
          </button>
          <div className={`links ${menuOpen ? "open" : ""}`}>
            <Link to = "/"
            style={{color:"#fff", textDecoration:"none",
            }} onClick={() => setMenuOpen(false)}>Home</Link>   
            <Link to = "/movies"
            style={{color:"#fff", textDecoration:"none",
            }} onClick={() => setMenuOpen(false)}>Movies</Link>   
            <Link to = "/contacts"
            style={{color:"#fff", textDecoration:"none", cursor: "not-allowed",
            }} onClick={() => setMenuOpen(false)}>Contact</Link>   
        </div>
        </div>
    <div className="content__wrapper">
        <h1>
            Explore Our Movie Library
        </h1>
        <div className="input__wrap" >
        <input id="movie-search"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                placeholder="Search for movies"
            /> 
            </div>
        </div>
        </div>
        <div className="movie__poster">
        <video autoPlay loop muted playsInline>
            <source src={moviePoster} type="video/mp4" />
        </video>
        </div>
</div>
    )
}
    
export default Home
