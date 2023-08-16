'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Styles from './page.module.css'
import Skeleton from '../components/skeleton'
import Pokecard from '../components/pokecard'
import Search from '../components/search';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const search = searchParams.get('pokemon');
    const searchLowerCase = search?.toLowerCase();
    const [pokemons, setPokeData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(searchLowerCase, "AAAA");
    useEffect(() => {
        console.log(searchLowerCase, "BBBB");
        async function getPokemons(){
            const res = await fetch(`http://localhost:3000/api/search?pokemon=${searchLowerCase}`, {
                headers: {
                  'method': 'GET',
                  'Content-Type': 'application/json',
                },
              });

            const data = await res.json();
            setPokeData(data);
            setIsLoading(false);
        } 
        if(searchLowerCase){
            getPokemons();
        } else {
            setIsLoading(false);
        }

    },[]);

    return(
        <main>
            <Search />
            <div className={Styles.container_pokedex}>
                <h1 className={Styles.title}>Buscando em Pokédex: <strong>{searchLowerCase}</strong></h1>
                
                <ul className={Styles.ul}>
                    {pokemons.results?.map((pokemon: any) => (
                        <li key={pokemon.name}><Pokecard pokemon={pokemon} /></li>
                        ))}
                {isLoading && 
                <>
                    <li><Skeleton /></li>
                    <li><Skeleton /></li>
                    <li><Skeleton /></li>
                    <li><Skeleton /></li>
                </>}
                </ul>
                {!isLoading && <p className={Styles.mensagem_fim_da_linha}>Fim da linha, não há mais pokémons</p>}
            </div>
        </main>
    )
}
