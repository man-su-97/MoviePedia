import React from "react";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import axios from "axios";
import "./Movies.css";
import Genres from "../../components/SingleContent/Genres";
import useGenre from "../../Hooks/useGenre";

const Movies = () => {
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(`
      https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&&page=${page}
      &with_watch_monetization_types=flatrate&with_genres=${genreforURL}`);

    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  
  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    //eslint-disabled-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="movies">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
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

export default Movies;
