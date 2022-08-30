import axios from 'axios';
import { PokemonData } from '../contexts/AppContext/type';
import { getPokemoImageUrl } from '../utils/functions';
import { FlavorTextEntry } from './types';

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

export const getPokemonMaxCount = async () => {
  const res = await api.get('pokemon-species');

  return res.data.count;
}

export const fetchPokemon = async (id: number): Promise<PokemonData> => {
  const res = await api.get(`pokemon-species/${id}`);
  const { name, flavor_text_entries: flavorTextEntries } = res.data;
  const image = getPokemoImageUrl(id);
  const flavorTextEnglishObj = flavorTextEntries.find((obj: FlavorTextEntry) => obj.language?.name === 'en');

  let flavorText =  flavorTextEnglishObj ? flavorTextEnglishObj.flavor_text : '';
  if (flavorText.toLowerCase().includes(name)) {
    flavorText = flavorText.replace(name.toUpperCase(), `${flavorText.indexOf(name.toUpperCase()) ? 'i' : 'I'}t`);

    // This handles some weird edge cases.
    const properName = name[0].toUpperCase() + name.substr(1);
    flavorText = flavorText.replace(properName, `${flavorText.indexOf(properName) ? 'i' : 'I'}t`);
  }

  return {
    name,
    image,
    flavorText,
  };
}
