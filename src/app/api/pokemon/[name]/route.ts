import { NextResponse } from 'next/server'
 
export async function GET(request: Request, { params }: { params: { name: string } }) {
  const name = params.name;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`, {
    headers: {
      'method': 'GET',
      'Content-Type': 'application/json',
    },
  });
  const pokemons = await res.json();
 
  return NextResponse.json(pokemons, {status: 200,});
}