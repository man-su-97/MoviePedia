import {
  TextField,
  Button,
  Tab,
  Tabs,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import Box from "@mui/material/Box";
import "../Search/search.css";

const Search = () => {
  const [page, setPage] = useState(1);
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#9A208C",
      },
    },
  });

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          {/* <Box
            component="form"
            sx={{
              m: 1,
              width: "100%",
            }}
            noValidate
            autoComplete="on"
          ></Box> */}
          <TextField
            style={{ flex: 1, marginRight: 10 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ width: "7%", marginRight: 10 }}
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
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="movies">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
