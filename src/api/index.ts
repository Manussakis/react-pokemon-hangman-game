import axios from 'axios';
import { PokemonData } from '../context/AppContext';
import { getPokemoImageUrl } from '../library/utils';

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  }
}

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

export const fetchPokemon = async (id: number): Promise<PokemonData> => {
  const res = await api.get(`pokemon-species/${id}`);
  const { name, flavor_text_entries: flavorTextEntries } = res.data;
  const image = getPokemoImageUrl(id);
  const flavorTextEnglishObj = flavorTextEntries.find((obj: FlavorTextEntry) => obj.language?.name === 'en');

  const flavorText =  flavorTextEnglishObj ? flavorTextEnglishObj.flavor_text : '';

  return {
    name,
    image,
    flavorText,
  };
}
