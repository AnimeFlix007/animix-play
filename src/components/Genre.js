import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const Genre = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const fetchGenre = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=a604cbfc2bea2f2f156b3488cb1d454f&language=en-US`
    );
    setGenres(res.data.genres);
  };

  const addGenreHandler = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g)=>{
      return g.id !== genre.id
    }))
  }

  const removeGenreHandler = (genre) => {
    setGenres([...genres, genre]);
    setSelectedGenres(selectedGenres.filter((g)=>{
      return g.id !== genre.id
    }))
  }

  useEffect(() => {
    fetchGenre()
      .then(() => {
        console.log("genree");
      })
      .catch((err) => {
        console.log(err);
      });
      // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0px" }}>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={()=>removeGenreHandler(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          color="secondary"
          onClick={()=>addGenreHandler(genre)}
        />
      ))}
    </div>
  );
};

export default Genre;
