import React, { useState } from "react";
import axios from "axios";
import Workout from "./Workout.jsx";
import { Button, FormControl, Box, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useStyles from "../styles";

const WorkoutSearch = ({ user, fetchUser }) => {
  const classes = useStyles();
  // choices of muscle groups
  const keywords = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];

  // states
  const [selectedKeyword, setSelectedKeyword] = useState("");

  // state for filtered mock data
  const [filteredResults, setFilteredResults] = useState([]);

  // handler for keyword selection
  const handleKeywordSelect = (e) => {
    setSelectedKeyword(e.target.value);
  };

  // handle search on keyword selection
  const handleSearch = () => {
    if (!selectedKeyword) return;

    axios
      .get(`/user/workouts/search/${selectedKeyword}`)
      .then((result) => {
        setFilteredResults(result.data);
      })
      .catch((error) => {
        console.error("There was an error fetching workouts.");
      });
  };

  // handle user clicks to add workout to saved list
  const handleSelectedWorkout = (workout, index) => {
    axios
      .patch(`/user/workouts/create`, { workout })

      .then(() => {
        setFilteredResults((prevResults) =>
          prevResults.filter((_, i) => i !== index)
        );
        fetchUser();
        alert("Workout has been added to your saved workout list!");
      })
      .catch(() => {
        console.error("Failed to save workout");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px",
      }}
    >
      <FormControl sx={{ width: 500, alignContent: "center"}}>
        <label htmlFor="keyword" style={{ textAlign: "center" }}>
          Choose Muscle Group:
        </label>
        <Select
          id="keyword"
          value={selectedKeyword}
          onChange={handleKeywordSelect}
          displayEmpty
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value="" disabled>
            Select a muscle group
          </MenuItem>
          {keywords.map((keyword) => (
            <MenuItem key={keyword} value={keyword}>
              {keyword}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="outlined"
          sx={{
            background: "linear-gradient(45deg, #556270 30%, #FF6B6B 90%)",
            borderRadius: 3,
            color: "white",
            height: 48,
            padding: "0 30px",
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            "&:hover": { background: "rgba(226, 222, 222)" },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </FormControl>
      <h3 style={{ marginTop: "20px" }}>Workout results</h3>
      <Box
        className={classes.box}
        sx={{
          overflowX: 'auto',
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
          padding: '10px',
          alignItems: 'center'
        }}
      >
        {filteredResults.length > 0 ? (
          filteredResults.map((workout, index) => (
            <div className={classes.workouts} key={index}>
              <Button
                className={classes.addButton}
                variant="contained"
                color="primary"
                onClick={() => handleSelectedWorkout(workout, index)}
                sx={{
                  backgroundColor: 'transparent'
                }}
              >
                <AddIcon />
              </Button>
              <Workout workout={workout} key={index} />
            </div>
          ))
        ) : (
          <span
            style={{
              padding: "10px",
              color: "#666",
              width: "100%",
              textAlign: "center",
            }}
          >
            No results found
          </span>
        )}
      </Box>
    </div>
  );
};

export default WorkoutSearch;
