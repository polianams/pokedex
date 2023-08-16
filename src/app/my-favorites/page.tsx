"use client"
import Pokecard from "../components/pokecard";
import Search from "../components/search";
import Skeleton from "../components/skeleton";
import Loading from "../loading";
import Style from "./page.module.css";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
 
interface PokeData {
    id: number,
    name: string,
    url: string,
    userId: number
}

export default function Favorites() {
    const {user} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [favList, setFavList] = useState<PokeData[]>([]);
   
    useEffect(() => {
        async function getPokemons(){
            const res = await fetch(`http://localhost:3000/api/favorites?user=${user?.id}`, {
                headers: {
                  'method': 'GET',
                  'Content-Type': 'application/json',
                },
              });

            const data = await res.json();
            if(data){
                setFavList(data);
                setIsLoading(false);
            }
        } 
        if(user){
            getPokemons();
        }
    },);

    if(user === undefined){
        return(
            <main>
                <div className={Style.Container_Favoritos}>
                    {<p style={{width: '1020px'}}  className={Style.mensagem_fim_da_linha}>Área não autorizada. Faça o login para ter acesso.</p>}
                </div>
            </main>
        )
    } if(user){
        return(
            <main>
                <Search />
                <div className={Style.Container_Favoritos}>
                    <div className={Style.title}>
                        <h1>My </h1>
                        <Image className={Style.Image_Heart} src="/imagens/heart-favorite.svg" alt="Imagem de um coração." width={50} height={25}/>
                        <h1> Pokémons</h1>
                    </div>
                    <ul className={Style.ul}>
                    {favList.map((objeto) => (
                    <li key={objeto.id}><Pokecard pokemon={objeto} /></li>
                    ))}
                    {isLoading && 
                    <>
                        <li><Skeleton /></li>
                        <li><Skeleton /></li>
                        <li><Skeleton /></li>
                    </>}
                    </ul>
                    {!isLoading && <p className={Style.mensagem_fim_da_linha}>Fim da linha, não há mais pokémons</p>}
                </div>
            </main>
        )


    } else if(user === null){
        return (
            <main>
                <Loading />
            </main>
        )
    }

}
