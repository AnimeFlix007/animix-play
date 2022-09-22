import { Pagination } from "@mui/material";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const PaginationSx = ({ page, setPage, totalPages }) => {
  const changePageHandler = (p) => {
    setPage(p);
    window.scroll(0,0)
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      <ThemeProvider theme={theme}>
        <Pagination
          count={totalPages}
          onChange={(e) => changePageHandler(e.target.textContent)}
        />
      </ThemeProvider>
    </div>
  );
};

export default PaginationSx;
