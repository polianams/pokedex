import { NextResponse } from 'next/server'

interface pokeData { 
    name: string;
    url: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pokemonPesquisado = searchParams.get('pokemon');

  const res = await fetch("http://localhost:3000/api/pokemon?limit=1080&offset=0", {
    headers: {
      'method': 'GET',
      'Content-Type': 'application/json',
    },
  });
  
  const pokemons = await res.json();

  const arrayForFilter = pokemons.results;

  const filteredArray:pokeData[] = arrayForFilter.filter((poke: { name: { startsWith: (arg0: string | null) => any; }; }) => poke.name.startsWith(pokemonPesquisado));

  pokemons.results = filteredArray;

  return NextResponse.json(pokemons, {status: 200,});
}