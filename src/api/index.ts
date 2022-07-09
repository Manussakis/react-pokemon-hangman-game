

export const api = async () => {
  const url = 'https://swapi.dev/api/people/1';

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error.message)
  }
}
