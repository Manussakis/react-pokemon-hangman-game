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
  flavorText = replacePokemonName(flavorText, name);

  return {
    name,
    image,
    flavorText,
  };
}

const replacePokemonName = (text: string, name: string) => {
  if (text.toLowerCase().includes(name)) {
    const properName = name[0].toUpperCase() + name.substr(1);
    const words = text.toLowerCase().split(' ');

    let wordIndex = words.findIndex((word) => word === name.toUpperCase());
    let previousWord = words[wordIndex - 1];
    if (previousWord === 'a' || previousWord === 'this') {
      previousWord = `${text.indexOf(name.toUpperCase()) ? 't' : 'T'}his`
      words[wordIndex] = 'Pokémon'
    }

    wordIndex = words.findIndex((word) => word === properName);
    previousWord = words[wordIndex - 1];
    if (previousWord === 'a' || previousWord === 'this') {
      previousWord = `${text.indexOf(properName) ? 't' : 'T'}his`
      words[wordIndex] = 'Pokémon'
    }

    text = text.replace(name.toUpperCase(), `${text.indexOf(name.toUpperCase()) ? 't' : 'T'}his Pokémon`);
    text = text.replace(properName, `${text.indexOf(properName) ? 'T' : 't'}his Pokémon`);
    text = text.replace(`${properName}'s`, `${text.indexOf(properName) ? 'T' : 't'}his Pokémon's`);
  }
  return text;
}