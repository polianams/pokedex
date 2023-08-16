"use client"
import Image from "next/image";
import Style from "./styles/header.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { usePathname } from "next/navigation";

export const metadata = {
    title: 'PokedexAPI',
    description: 'Criando uma Pokedex usando API',
  }

export default function Header() {
    const {user, signOut} = useContext(AuthContext);
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const pathname = usePathname();

    useEffect(() => {
            setUserName(user?.name);
    },[user]);

    
    async function handleSignOut() {
        await signOut();
    }
    if(pathname === "/login" || pathname === "/login/register"){
        return (
            <header>
                 <div style={{paddingBlock: '16px'}}>
                        <a href="./"><Image src="/imagens/Logo.svg" alt="Pokedex Logo" width={36} height={36} /></a>
                    </div>
            </header>
        )
    } else {
        if(user){
            return (
                <header className={Style.header}>
                        <div className={Style.user_area}>
                            <a href="./"><Image src="/imagens/Logo.svg" alt="Pokedex Logo" width={36} height={36} /></a>
                            <span>
                                <p><strong>{userName}</strong></p>
                                <p style={{ cursor: 'pointer' }} onClick={handleSignOut}>Log out</p>
                            </span>
                        </div>
                        <nav className={Style.nav}>
                            <ul className={Style.ul}>
                                <a href="./">Home</a>
                                <a href="./my-favorites/">My Favorites</a>
                            </ul>
                        </nav>
                    </header>
            )
        } else if(user === undefined){
            return (
                <header className={Style.header}>
                    <div className={Style.user_area}>
                        <a href="./"><Image src="/imagens/Logo.svg" alt="Pokedex Logo" width={36} height={36} /></a>
                        <a href="./login">Login</a>
                    </div>
                    <nav className={Style.nav}>
                    </nav>
                </header>
            )
        } else if(user === null){
            return (
                <header className={Style.header}>

                </header>
            )
        }

    }

}