'use client'
import Style from "./styles/search.module.css";
import Image from "next/image";
import { useState } from "react";

export default function Search({ onInputChange }:any) {
    const [termoPesquisa, setTermo] = useState("");
    const handleSubmit = (event: any) => {
        event.preventDefault();
        window.location.href = `/search?pokemon=${termoPesquisa}`;
    };

    const handleChange = (event: any) => {
        setTermo(event.target.value);
      };

    return(
        <section className={Style.section}>
            <form onSubmit={handleSubmit} >
                <input onChange={handleChange} name="pokemon" className={Style.input} type="text" placeholder="Pesquisar pokémon" />
                <Image onClick={handleSubmit} className={Style.Image} src="/imagens/Lupa.svg" alt="Botão em formato de lupa" width={32} height={32} />
            </form>
        </section>
    )
}