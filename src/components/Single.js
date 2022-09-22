import React from "react";
import '../css/Single.css'
import { img_300, unavailable } from "../config/config";
import { Badge } from "@mui/material";
import BasicModal from "./ModalMovies";

const Single = ({ id, poster, title, date, media_type, rating }) => {
  const item = {
    id,
    title,
    poster,
    date,
    media_type,
    rating
  }
  return (
    <BasicModal className="media" item={item} media_type={media_type} id={id}>
      <Badge badgeContent={rating.toFixed(1)} color={rating>8 ? "primary" : "secondary"} />
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title.length > 16 ? title.substring(0,16)+"..." : title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </BasicModal>
  );
};

export default Single;
