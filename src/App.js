import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/movies" element={<Movies />}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
