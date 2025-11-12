import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemon = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
  return {
    id: response.data.id,
    name: response.data.name,
    imageUrl: response.data.sprites.other["official-artwork"].front_default,
  };
};
