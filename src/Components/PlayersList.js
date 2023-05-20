import React, { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';

const PlayersList = ({ teamID, season, keyFootball }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const url =
        'https://api-football-v1.p.rapidapi.com/v3/players?team=' +
        teamID +
        '&season=' +
        season;
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
        const players = result.response;
        setPlayers(players);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayers();
  }, [keyFootball, season, teamID]);

  return (
    <div className="playerList">
      {players.map((player) => (
        <PlayerCard key={player.player_id} player={player.player} />
      ))}
    </div>
  );
};

export default PlayersList;
