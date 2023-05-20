import React, { useEffect, useRef } from 'react';

const Lineups = ({
  teamID,
  keyFootball,
  selectedLeague,
  season,
  infoTeam,
  setInfoTeam,
}) => {
  const totalVitoriasRef = useRef(0);
  const totalDerrotasRef = useRef(0);
  const totalEmpatesRef = useRef(0);
  const totalJogosRef = useRef(0);

  useEffect(() => {
    const fetchLineUp = async () => {
      const url =
        'https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=' +
        selectedLeague +
        '&season=' +
        season +
        '&team=' +
        teamID;
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
        setInfoTeam(result);
        totalVitoriasRef.current = infoTeam.response.biggest.streak.wins;
        totalDerrotasRef.current = infoTeam.response.biggest.streak.loses;
        totalEmpatesRef.current = infoTeam.response.biggest.streak.draws;
        totalJogosRef.current =
          totalVitoriasRef.current +
          totalDerrotasRef.current +
          totalEmpatesRef.current;
      } catch (error) {
        console.error(error);
      }
    };

    fetchLineUp();
  }, [keyFootball, selectedLeague, season, teamID, setInfoTeam]);

  return (
    <>
      {-1 > 0 ? <p>''</p> : <p className="noLineup">Sem lineups disponíveis</p>}
      <div className="infos">
        <table>
          <thead>
            <tr>
              <th>Total de Jogos</th>
              <th>Total de Vitórias</th>
              <th>Total de Derrotas</th>
              <th>Total de Empates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalJogosRef.current}</td>
              <td>{totalVitoriasRef.current}</td>
              <td>{totalDerrotasRef.current}</td>
              <td>{totalEmpatesRef.current}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Lineups;
