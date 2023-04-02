import * as React from "react";
import { useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#FF165D",
        borderRadius: "5px",
        color: "white",
        zIndex: 100,
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Trending"
        value={0}
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies"
        value={1}
        icon={<MovieCreationIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="TV Series"
        value={2}
        icon={<OndemandVideoIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Search"
        value={3}
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
