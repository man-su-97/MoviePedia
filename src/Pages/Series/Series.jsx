import React from "react";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import axios from "axios";
import "./Series.css";
import useGenre from "../../Hooks/useGenre";
import Genres from "../../components/SingleContent/Genres";

const Series = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [page, setPage] = useState(1);
  const genreforURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0&with_genres=${genreforURL}`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    //eslint-disabled-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="series">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
