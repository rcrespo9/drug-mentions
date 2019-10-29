import React, { useState } from 'react';

import drugsData from './drugs.json'

import Search from './components/Search';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  const fetchSearchResults = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  }

  return (
    <div className="App">
      <Search textChange={fetchSearchResults} />
    </div>
  );
}

export default App;
