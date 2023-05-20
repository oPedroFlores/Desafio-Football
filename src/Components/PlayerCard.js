import React from 'react';

const PlayerCard = ({ player }) => {
  return (
    <div className={`playerCard`}>
      <img src={player.photo} alt={player.name} />
      <div className="cardInfos">
        <p>{player.name}</p>
        <span>
          Idade: {player.age} ({player.birth.date})
        </span>
        <span>Altura: {player.height ? 'Não informada' : player.height}</span>
        <span>
          Nacionalidade:{' '}
          {player.birth.nationality ? 'Não informada' : player.nationality}
        </span>
      </div>
    </div>
  );
};

export default PlayerCard;
