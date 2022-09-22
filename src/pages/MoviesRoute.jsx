import axios from "axios";
import React, { useState, useEffect } from "react";
import Genre from "../components/Genre";
import PaginationSx from "../components/PaginationSx";
import Single from "../components/Single";
import useGenreHook from "../hook/useGenreHook";

const MoviesRoute = () => {
  const [page, setPage] = useState(1);
  const [moviesData, setMoviesData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const genreURL = useGenreHook(selectedGenres);

  const fetchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=a604cbfc2bea2f2f156b3488cb1d454f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=${genreURL}`
    );

    setMoviesData(response.data.results);
    // console.log(response.data);
    setTotalPages(response.data.total_pages);
  };

  useEffect(() => {
    fetchMovies()
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log("error");
      });
      // eslint-disable-next-line
  }, [page, genreURL]);
  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genre
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
        type="movie"
        setTotalPages={setTotalPages}
      />
      <div className="trending">
        {moviesData &&
          moviesData.map((c) => (
            <Single
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              rating={c.vote_average}
            />
          ))}
      </div>
      {totalPages >= 2 && (
        <PaginationSx page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default MoviesRoute;
