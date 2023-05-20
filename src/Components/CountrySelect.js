import React, { useState, useEffect } from 'react';

const CountrySelect = ({ selectedCountry, onChange, keyFootball }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const url = 'https://api-football-v1.p.rapidapi.com/v3/countries';
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
        const countryNames = result.response.map((country) => country.name);
        setCountries(countryNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, [keyFootball]);

  return (
    <div>
      <h1>Selecione um país:</h1>
      <select value={selectedCountry} onChange={onChange}>
        <option value="">Selecione</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;
