import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Single from "../components/Single";
import '../css/TrendingRoute.css'
import PaginationSx from "../components/PaginationSx";

const TrendingRoute = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [totalPages, setTotalPages] = useState(1);

  const fetchTrendingMovies = async () => {
    console.log(process.env.REACT_APP_API_KEY)
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=a604cbfc2bea2f2f156b3488cb1d454f&page=${page}`
    );
    setData(response.data.results);
    setTotalPages(response.data.total_pages);
  };

  useEffect(() => {
    fetchTrendingMovies()
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log("error");
      });
      // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {data &&
          data.map((c) => (
            <Single
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              rating={c.vote_average}
            />
          ))}
      </div>
      <PaginationSx page={page} setPage={setPage} totalPages={200} />
    </div>
  );
};

export default TrendingRoute;
