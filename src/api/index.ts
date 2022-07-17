import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

export const getPokemonMaxCount = async () => {
  try {
    const res = await api.get('pokemon-species');

    return res.data.count;
  } catch(error: any) {
    console.log(error.message)
  }
}

export const fetchPokemon = async (id: number) => {
  try {
    const res = await api.get(`pokemon/${id}`);

    return res.data;
  } catch(error: any) {
    console.log(error.message)
  }
}
