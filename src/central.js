import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import CountrySelect from './Components/CountrySelect';
import SeasonSelect from './Components/SeasonSelect';
import LeagueSelect from './Components/LeagueSelect';
import TeamSelect from './Components/TeamSelect';
import PlayersList from './Components/PlayersList';
import Lineups from './Components/Lineups';
import GraphGols from './Components/GraphGols';

const Central = () => {
  const navigate = useNavigate();
  const keyFootball = localStorage.getItem('keyfootball');

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [infoTeam, setInfoTeam] = useState('');

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  if (!keyFootball) {
    navigate('/login');
    return null; // Retornar null para não renderizar nada enquanto redireciona para a rota de login
  }

  return (
    <div>
      <div className="busca">
        {/* Países */}
        <CountrySelect
          selectedCountry={selectedCountry}
          onChange={handleCountryChange}
          keyFootball={keyFootball}
        />
        <SeasonSelect
          keyFootball={keyFootball}
          selectedSeason={selectedSeason}
          onChange={handleSeasonChange}
        />
        {/* Ligas */}
        {selectedCountry ? (
          <LeagueSelect
            selectedLeague={selectedLeague}
            selectedCountry={selectedCountry}
            keyFootball={keyFootball}
            onChange={handleLeagueChange}
          ></LeagueSelect>
        ) : (
          <div className="selecione">
            <h1>Selecione uma liga:</h1>
            <p className="selecionePrimeiro">Primeiro selecione um país...</p>
            <select disabled placeholder="..."></select>
          </div>
        )}
        {/* Times */}
        {selectedLeague ? (
          <TeamSelect
            selectedLeague={selectedLeague}
            selectedTeam={selectedTeam}
            keyFootball={keyFootball}
            onChange={handleTeamChange}
          ></TeamSelect>
        ) : (
          <div className="selecione">
            <h1>Selecione um time:</h1>
            <p className="selecionePrimeiro">Primeiro selecione uma liga...</p>
            <select disabled placeholder="..."></select>
          </div>
        )}
      </div>
      {/* PlayersCards */}
      {selectedTeam && selectedSeason ? (
        <PlayersList
          teamID={selectedTeam}
          season={selectedSeason}
          keyFootball={keyFootball}
        ></PlayersList>
      ) : (
        ''
      )}
      {/* Formações */}
      {selectedTeam && selectedSeason ? (
        <Lineups
          teamID={selectedTeam}
          keyFootball={keyFootball}
          selectedLeague={selectedLeague}
          season={selectedSeason}
          setInfoTeam={setInfoTeam}
          infoTeam={infoTeam}
        />
      ) : (
        ''
      )}
      {/* GolsGraph */}
      {selectedTeam && selectedSeason ? <GraphGols infoTeam={infoTeam} /> : ''}
    </div>
  );
};

export default Central;
