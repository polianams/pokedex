import { useEffect, useState } from "react"
import React from 'react'
import Image from 'next/image'
import Style from './styles/pokecard.module.css'
import Skeleton from "./skeleton";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

type PokeData = {
    id: number,
    name: string,
    url: string,
    userId: number
}

export default function Pokecard(props: any) {
    const {user, favList, getFav} = useContext(AuthContext);
    const url = props.pokemon?.url;    
    const [pokemon, setPokeData] = useState<any>([]);
    const [pokeName, setName] = useState(null);
    const [pokeTypes, setTypes] = useState<any>([]);
    const [pokeId, setId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFav, setIsFav] = useState(false);

    async function handleAddFav() {
        setIsFav(true);
        if(user){
            await fetch(`http://localhost:3000/api/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: props.pokemon?.name,
                    url: props.pokemon?.url,
                    userId: user?.id
                }),
            });
            getFav(user.id);
        }
    }

    async function handleDelFav() {
        if(user){
            await fetch(`http://localhost:3000/api/favorites?user=${user.id}&pokemon=${pokeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setIsFav(false);
            getFav(user.id);
        }
    }

    function getFavPoke(data:PokeData){
        if(user){
            const pokeEncontrado = favList.some((obj: PokeData) => obj.userId === user.id && obj.name === data.name);
            console.log( pokeEncontrado, favList);
            if (pokeEncontrado) {
                setIsFav(true);
            } else {
                setIsFav(false);
            }
        }
    }

    function changeSpan(span:string){
        return `span_${span}`
    }
    function changeArticle(article:string){ 
        return `article_${article}`
    }

    useEffect(() => {
        async function getData(){
            const res = await fetch(url);
            const data = await res.json();
            setPokeData(data);
            setName(data.name);
            setTypes(data.types);
            setId(data.id);
            getFavPoke(data);
            setIsLoading(false);
        } 
        getData();
    },[])

    if(isLoading){
        return <><Skeleton /></>
    } else {
            return (
                <article className={`${Style.article} ${Style[changeArticle(pokeTypes[0].type.name)]}`}>
                <section className={Style.section}>
                    {user && (isFav ? 
                        <Image style={{cursor: 'pointer'}} onClick={handleDelFav}
                            src={`/imagens/heart.svg`} 
                            alt={`Favoritar o pokemon ${pokeName}`}
                            width={18} 
                            height={18}
                        />
                        :
                        <Image style={{cursor: 'pointer'}} onClick={handleAddFav}
                            src={`/imagens/heart_fav_card.svg`} 
                            alt={`Favoritar o pokemon ${pokeName}`}
                            width={18} 
                            height={18}
                        />)
                        }
                    <p>{pokeName}</p>
                    <div className={Style.tipos}>
                        {pokeTypes.map((item: any) => (
                        <span key={item.slot} className={`${Style.span} ${Style[changeSpan(item.type.name)]}`}>{item.type.name}</span>
                        ))}
                    </div>
                </section>
                <figure>
                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokeId}.gif`} alt="Imagem do Pokémon" width={120} height={120} />
                </figure>
            </article>
        )
    }
}