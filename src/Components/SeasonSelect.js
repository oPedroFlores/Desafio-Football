import React, { useState, useEffect } from 'react';

const SeasonSelect = ({ selectedSeason, onChange, keyFootball }) => {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      const url = 'https://api-football-v1.p.rapidapi.com/v3/leagues/seasons';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': keyFootball,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const seasonNames = result.response.map((season) => season);
        setSeasons(seasonNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeasons();
  }, [keyFootball]);

  return (
    <div>
      <h1>Selecione uma temporada:</h1>
      <select value={selectedSeason} onChange={onChange}>
        <option value="">Selecione</option>
        {seasons.map((season, index) => (
          <option key={index} value={season}>
            {season}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeasonSelect;
