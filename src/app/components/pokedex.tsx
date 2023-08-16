"use client"
import { useEffect, useState } from "react";
import Pokecard from "./pokecard";
import Styles from "./styles/pokedex.module.css";
import Skeleton from "./skeleton";

export default function Pokedex() {
    const [pokemons, setPokeData] = useState<any>([]);
    const [pagination, setPagination] = useState(18);
    const [endPagination, setEndPagination] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getPokemons() {
            const res = await fetch(`http://localhost:3000/api/pokemon?limit=${pagination}&offset=0`, {
                headers: {
                  'method': 'GET',
                  'Content-Type': 'application/json',
                },
              });

            const data = await res.json();
            if(data === pokemons){
                setEndPagination(true);
                setIsLoading(false);
            } else{
                setPokeData(data);
                setIsLoading(false);
            }
        } 
        getPokemons();
    },[pagination]);


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if(entries.some(entry => entry.isIntersecting) && endPagination === false){
                setIsLoading(true);
                setPagination((valorAtual) => valorAtual + 12);
            }
        });

        const element = document.querySelector('.guard');
        if (element) {
            observer.observe(element);
        }
        return () => {
            if (element) {
            observer.unobserve(element);
            }
        };

    }, [endPagination]);

    return(
        <>

        <div className={Styles.container_pokedex}>
            <h1>Pokédex</h1>
            
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
                <li><Skeleton /></li>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
            </>}
            </ul>
            {endPagination && <p className={Styles.mensagem_fim_da_linha}>Fim da linha, não há mais pokémons</p>}
        </div>
    </>
    )
}