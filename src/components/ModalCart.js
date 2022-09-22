import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import watchListContext from "../context/watchlist-context";
import "../css/WatchListModal.css";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Button } from "@mui/material";
import { img_300, unavailable } from "../config/config";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  backgroundColor: "#39445a",
  borderRadius: 10,
  color: "white",
  p:4
};

export default function WatchListModal({ children }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const watchListCtx = React.useContext(watchListContext);

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="watchListModal"
        
      >
        <Box className="cartModal" sx={style}>
          <CloseIcon onClick={handleClose} className="closebtnIcon" />
          <Typography
            id="modal-modal-title"
            className="cartHeading"
            variant="h6"
            component="h2"
          >
            Watch List Movies/TV Series
          </Typography>
          {watchListCtx.items.length > 0 ? (
            <Typography
              id="modal-modal-description"
              className="cartContainer"
              sx={{ mt: 2 }}
            >
              {watchListCtx.items.map((item) => {
                return (
                  <div className="singlecartItem">
                    <img
                      className="cartImg"
                      src={
                        item.poster ? `${img_300}${item.poster}` : unavailable
                      }
                      alt={item.title}
                    />
                    <div className="singlecartItem__content">
                      <p className="singlecartItem__content_heading">
                        {item.title}
                      </p>
                      <div className="singlecartItem__content2">
                        <p className="singlecartItem__content_media_type">
                          {item.media_type === "tv" ? "TV Series" : "Movie"}
                        </p>
                        <p className="singlecartItem__content_date">
                          {item.date}
                        </p>
                      </div>
                      <p className="singlecartItem__content_rating">
                        Rating : {item.rating.toFixed(1)}
                      </p>
                      <Button
                      size="small"
                        variant="contained"
                        startIcon={<DisabledByDefaultIcon />}
                        color="error"
                        className="removeFromWatchList"
                        onClick={() =>
                          watchListCtx.removeFromWatchList(item.id)
                        }
                      >
                        Remove From WatchList
                      </Button>
                    </div>
                  </div>
                );
              })}
            </Typography>
          ) : (
            <div className="noitemsinWatchlIST">Watch List Is Empty</div>
          )}
        </Box>
      </Modal>
    </>
  );
}
