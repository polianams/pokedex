import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const paramsUserId = searchParams.get('user');
    const paramsPokeId = searchParams.get('pokemon');
    const userId = +(paramsUserId ?? '');
    const pokeId = +(paramsPokeId ?? '');

    const userExists = await prisma.users.findFirst({
        where: {
            id: userId,
        },
    });
    if(!userExists) {
        return NextResponse.json({message: "Usuário não existe",}, {status: 400,});
    }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`, {
    headers: {
      'method': 'GET',
      'Content-Type': 'application/json',
    },
    });

    const pokemonData = await res.json();

    const pokemonSearch = await prisma.pokemons.findFirst({
        where: {
            name: pokemonData.name,
            userId: userId,
        },
    });

    if(!pokemonSearch) {
        return NextResponse.json({message: "Pokémon não está na lista de favoritos",}, {status: 400,});
    }

    const myFavs = await prisma.pokemons.delete({
        where: {
            id: pokemonSearch.id,
        },
    });

    return NextResponse.json({message: "Pokémon excluido da lista de favoritos",}, {status: 200,});

}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const paramsId = searchParams.get('user');
    const userId = +(paramsId ?? '');

    const userExists = await prisma.users.findFirst({
        where: {
            id: userId,
        },
    });


    if(!userExists) {
        return NextResponse.json({message: "Usuário não existe",}, {status: 400,});
    }

    const myFavs = await prisma.pokemons.findMany({
        where: {
            userId: userId,
        },
    });

    

    return NextResponse.json(myFavs, {status: 200,});
}

export async function POST(request: Request, response: Response) {
    const { name, url, userId } = await request.json();

    const favExists = await prisma.pokemons.findFirst({
        where: {
            name: name,
            userId: userId
        },
    })

    if(favExists) {
        return NextResponse.json({message: "Pokémon já está favoritado",}, {status: 400,});
    }

    const newFav = await prisma.pokemons.create({
        data: {
            name: name,
            url: url,
            userId: userId,
        },
    });

    return NextResponse.json({message: "Pokémon favoritado com sucesso",}, {status: 200,});

}


