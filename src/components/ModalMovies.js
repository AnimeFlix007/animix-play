import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../css/ModelMovies.css";
import "../css/Single.css";
import axios from "axios";
import { Button } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { img_500, unavailable, unavailableLandscape } from "../config/config";
import CloseIcon from "@mui/icons-material/Close";
import AddCardIcon from "@mui/icons-material/AddCard";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import CarousalArtists from "./CarousalArtists";
import { useContext } from "react";
import watchListContext from "../context/watchlist-context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: "80%",
  height: "70%",
  backgroundColor: "#39445a",
  // eslint-disable-next-line no-dupe-keys
  borderRadius: 10,
  color: "white",
};

const classes = {
  paper: {
    height: "90%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    color: "white",
  },
  CloseIcon: {
    fontSize: "40px",
    position: "absolute",
    top: "2%",
    right: "1%",
    cursor: "pointer",
  },
};

export default function BasicModal({
  children,
  item,
  media_type,
  id,
  className,
}) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState(false);
  const [video, setVideo] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const watchlistCtx = useContext(watchListContext);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=a604cbfc2bea2f2f156b3488cb1d454f&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=a604cbfc2bea2f2f156b3488cb1d454f&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  React.useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={className} color="inherit" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} in={open}>
          <CloseIcon onClick={handleClose} style={classes.CloseIcon} />
          {content && (
            <div style={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <CarousalArtists media_type={media_type} id={id} />
                  <Button
                    variant="contained"
                    style={{
                      margi: ".7rem",
                    }}
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                  {watchlistCtx.items.includes(item) ? (
                    <Button
                      variant="contained"
                      startIcon={<DisabledByDefaultIcon />}
                      color="error"
                      onClick={() => watchlistCtx.removeFromWatchList(id)}
                    >
                      Remove From WatchList
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<AddCardIcon />}
                      color="primary"
                      onClick={() => watchlistCtx.addToWatchList(item)}
                    >
                      Add To WatchList
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}
