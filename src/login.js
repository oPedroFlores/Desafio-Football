import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (key) {
      const url = 'https://api-football-v1.p.rapidapi.com/v3/timezone';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': key,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      };
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (response.status === 403) {
          //Caso a key seja inválida
          setError('Erro ao fazer a requisição');
          setLoading(false);
        } else {
          //Caso a key seja válida
          // Faça o que for necessário com o resultado da requisição
          localStorage.setItem('keyfootball', key); // Adiciona a chave ao localStorage
          setError('Seja bem vindo!');
          navigate('/central');
        }
        setLoading(false);
      } catch (error) {
        //Caso tenha erro
        console.error(error);
        setLoading(false);
      }
    } else {
      //Caso não tenha informado chave
      setLoading(false);
      setError('Por favor, informe a chave');
    }
  };

  return (
    <div className="divForm">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="key"
          className="inputLogin"
          value={key}
          onChange={(event) => setKey(event.target.value)}
        />
        {loading ? (
          <button disabled className="buttonLogin">
            Enviando...
          </button>
        ) : (
          <button type="submit" className="buttonLogin">
            Logar
          </button>
        )}
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
