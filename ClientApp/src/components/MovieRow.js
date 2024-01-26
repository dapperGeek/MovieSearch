import React from 'react';

function MovieRow(props) {

    return (
        <div>

            <div className="list-row">
                <div className="movie-poster col-md-4">
                    <img className="poster-image" src={props.details.poster === 'N/A' ? '../images/no-img.jpg' : props.details.poster} alt={props.details.title} />
                </div>
                <div className="movie-details col-md-7 ms-2 justify-content-left">
                    <div>
                        <span>Year: </span><span id="year">{props.details.year}</span>
                    </div>
                    <div>
                        <span>Title: </span><span id="title">{props.details.title}</span>
                    </div>

                    <a class="show-plot-link" onClick={props.handleClick}>Show Plot</a>
                    {props.visible && (
                        <div id="plot_1" >
                            <p>Movie plot here...</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
export default MovieRow;