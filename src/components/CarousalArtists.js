import axios from "axios";
import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../config/config";
import '../css/CarousalArtists.css'

const CarousalArtists = ({ media_type, id }) => {
  const [artists, setArtists] = useState([]);

  const handleDragStart = (e) => e.preventDefault();
  const items = artists.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=a604cbfc2bea2f2f156b3488cb1d454f&language=en-US`
    );
    setArtists(data.cast);
  };

  React.useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);
  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default CarousalArtists;
