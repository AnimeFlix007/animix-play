import axios from "axios";
import React, { useState, useEffect } from "react";
import Genre from "../components/Genre";
import PaginationSx from "../components/PaginationSx";
import Single from "../components/Single";
import useGenreHook from "../hook/useGenreHook";

const TvRoute = () => {
  const [page, setPage] = useState(1);
  const [TVData, setTVData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const genreURL = useGenreHook(selectedGenres);

  const fetchTV = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=a604cbfc2bea2f2f156b3488cb1d454f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=${genreURL}`
    );

    setTVData(response.data.results);
    // console.log(response.data);
    setTotalPages(response.data.total_pages);
  };

  useEffect(() => {
    fetchTV()
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
      <span className="pageTitle">TV Series</span>
      <Genre
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
        type="tv"
        setTotalPages={setTotalPages}
      />
      <div className="trending">
        {TVData &&
          TVData.map((c) => (
            <Single
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
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

export default TvRoute;
