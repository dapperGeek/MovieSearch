import React, { useEffect, useState } from 'react';
import MovieRow from './MovieRow';

function MovieSearch() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [movies, setMovies] = useState([]);
    //const [recentSearch, setRecentSearch] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    //const [infoClass, setInfoClass] = useState('hide-plot')

    const handleSearch = async () => {
        const response = await fetch(`search?title=${searchTerm}&page=${currentPage}`);
        const data = await response.json();
        console.log("data", data)
        setMovies(data.search || []); // If Search is null, default to an empty array
        setTotalResults(data.totalResults || 0);
        //getRecents();
    };

    //const getRecents = async () => {
    //    const response = await fetch(`lastSearches`);
    //    const data = await response.json();
    //    setRecentSearch(data);
    //    console.log(data);
    //}

    function toggleInfo(id) {
        //setInfoClass(prevMovies => {
        //    return prevMovies.map(movie => {
        //        return movie.index === id ? {...movie, }
        //    })
        //})
        console.log(id);
    }

    useEffect(() => {
        handleSearch();
    }, [currentPage]); // Trigger search when currentPage changes

    return (
        <div className="App">
            <h1>Movie Search App</h1>
            <div>
                <input
                    type="text"
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter movie title"
                />
                <button className="btn btn-info mx-5 mt-2 text-white" onClick={handleSearch}>Search</button>
            </div>
            <div>

                <div className='row'>
                    {movies.map((movie) => (
                        <MovieRow handleClick={() => toggleInfo(movie.index)} key={movie.index} details={movie} />
                    ))}
                </div>

            </div>

            {totalResults > 0 && (
                <div className="pagination">
                    <button className="btn btn-info text-white me-2"
                        onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>{`Page ${currentPage} of ${Math.ceil(totalResults / 10)}`}</span>
                    <button className="btn btn-info text-white ms-2"
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