import React, {useState, useEffect} from 'react';
import axios from 'axios';

//should have search bar

//populates result window with results

//click on results to add to saved workout list
const WorkoutSearch = () => {
  //search input state
  const [searchQuery, setSearchQuery] = useState('');

  //inputChange handler to update searchQuery state on keystroke change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  }

  return (
    <div>
      <form action="/search-workouts" method="GET">
        <label for="query">Search Workouts:</label>
        <input
          type="search"
          id="query"
          name="query"
          placeholder="Type workout name..."
          required
          onChange={handleInputChange}
          value={searchQuery}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )

};

export default WorkoutSearch;
