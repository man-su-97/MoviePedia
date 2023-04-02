import * as React from "react";
import "./SingleContent.css";
import { img_300 } from "../../config/config";
import "./SingleContent.css";
import Badge from "@mui/material/Badge";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <div className="media">
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : 'unavailable'} //keep this unavailbale in string form -> "unavailable"
        alt={title}
      ></img>
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </div>
  );
};

export default SingleContent;
