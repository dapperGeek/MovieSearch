import React, { useEffect, useState } from 'react';
//import './App.css';

 function MovieSearch() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [movies, setMovies] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = async () => {
        const response = await fetch(`search?title=${searchTerm}&page=${currentPage}`);
        const data = await response.json();
        console.log("data", data)
        setMovies(data.search || []); // If Search is null, default to an empty array
        setTotalResults(data.totalResults || 0);
    };

     useEffect(() => {
         handleSearch();
     }, [currentPage]); // Trigger search when currentPage changes
  
    return (
        <div className="App">
            <h1>Movie Search App</h1>
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter movie title"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                {movies.map((movie) => (
                    <div key={movie.imdbID}>
                        <h2>{movie.title}</h2>
                        <p>{movie.year}</p>
                        <img src={movie.poster} alt={movie.title} />
                    </div>
                ))}
            </div>

            {totalResults > 0 && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>{`Page ${currentPage} of ${Math.ceil(totalResults / 10)}`}</span>
                    <button
                        onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(totalResults / 10)))}
                        disabled={currentPage === Math.ceil(totalResults / 10)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );

}
export default MovieSearch