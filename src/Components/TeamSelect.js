import React, { useState, useEffect } from 'react';

const TeamSelect = ({
  keyFootball,
  selectedLeague,
  selectedTeam,
  onChange,
}) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const url =
        'https://api-football-v1.p.rapidapi.com/v2/teams/league/' +
        selectedLeague;
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
        const teamsNames = await result.api.teams.map((team) => ({
          id: team.team_id,
          name: team.name,
        }));
        setTeams(teamsNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, [keyFootball, selectedLeague]);

  return (
    <div>
      <h1>Selecione um time:</h1>
      <select value={selectedTeam.id} onChange={onChange}>
        <option value="">Selecione</option>
        {teams.map((team, index) => (
          <option key={index} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamSelect;
