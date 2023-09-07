import React, { useState, useEffect } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(); // Move the fetchData call inside useEffect

    // Ensure you provide a dependency array to avoid infinite loops
  }, []); // The empty dependency array means this effect runs once after the initial render

  const filteredPhotos = photos.filter(photo => {
    return photo.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="container form-outline">
      
      <input
      className='form-control'
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredPhotos.length === 0 ? (
          <li>No results found.</li>
        ) : (
          filteredPhotos.map(photo => (
            <li key={photo.id}>{photo.title}</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Search;
