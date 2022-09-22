import { Button, Container, Tab, Tabs, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PaginationSx from "../components/PaginationSx";
import Single from "../components/Single";

const SearchRoute = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("naruto");
  const [page, setPage] = useState("");
  const [content, setContent] = useState([]);
  const [total_pages, setTotalPages] = useState(1);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const fetchSearch = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=a604cbfc2bea2f2f156b3488cb1d454f&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContent(response.data.results);
    setTotalPages(response.data.total_pages);
  };

  useEffect(() => {
    fetchSearch();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [page, type]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            display: "flex",
            margin: "15px 10px",
          }}
        >
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Movies" />
          <Tab style={{ width: "50%" }} label="TV Series" />
        </Tabs>
      </ThemeProvider>
      <div>
        <div className="trending">
          {content &&
            content.map((c) => (
              <Single
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type===1 ? "tv" : "movie"}
                rating={c.vote_average}
              />
            ))}
          {content.length < 1 && type === 1 && <Container>No TV Series Found</Container>}
          {content.length < 1 && type === 0 && <Container>No Movies Found</Container>}
        </div>
        {total_pages >= 2 && (
          <PaginationSx
            page={page}
            setPage={setPage}
            totalPages={total_pages}
          />
        )}{" "}
      </div>
    </div>
  );
};

export default SearchRoute;
