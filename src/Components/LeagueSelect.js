import React, { useState, useEffect } from 'react';

const LeagueSelect = ({
  keyFootball,
  selectedLeague,
  selectedCountry,
  onChange,
}) => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const url =
        'https://api-football-v1.p.rapidapi.com/v3/leagues?country=' +
        selectedCountry;
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
        const leagueNames = result.response.map((league) => ({
          id: league.league.id,
          name: league.league.name,
        }));
        setLeagues(leagueNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, [keyFootball, selectedCountry]);

  return (
    <div>
      <h1>Selecione uma liga:</h1>
      <select value={selectedLeague} onChange={onChange}>
        <option value="">Selecione</option>
        {leagues.map((league, index) => (
          <option key={index} value={league.id}>
            {league.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeagueSelect;
