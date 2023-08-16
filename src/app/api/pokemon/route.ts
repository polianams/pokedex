import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, {
    headers: {
      'method': 'GET',
      'Content-Type': 'application/json',
    },
  });

  const pokemons = await res.json();

  const arrayForChangeUrl = pokemons.results;

  arrayForChangeUrl.map((pokemon: any, index: number) => {
    pokemon.url = `http://localhost:3000/api/pokemon/${pokemon.name}`
  })

  pokemons.results = arrayForChangeUrl;

  return NextResponse.json(pokemons, {status: 200,});
}