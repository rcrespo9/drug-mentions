import React, { useState } from 'react';

import drugsData from './drugs.json'

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <div className="App">
    </div>
  );
}

export default App;
