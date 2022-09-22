import React from "react";
import { Route, Routes } from "react-router-dom";
import TrendingRoute from "../pages/TrendingRoute";
import MoviesRoute from "../pages/MoviesRoute";
import TvRoute from "../pages/TvRoute";
import SearchRoute from "../pages/SearchRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/trending" element={<TrendingRoute />} />
      <Route path="/movies" element={<MoviesRoute />} />
      <Route path="/tv" element={<TvRoute />} />
      <Route path="/search" element={<SearchRoute />} />
    </Routes>
  );
};

export default Router;
