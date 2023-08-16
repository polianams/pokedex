"use client"
import { SyntheticEvent, useContext, useState } from "react";
import Style from "./page.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from 'next/navigation'

type formData = {
    name: string,
    email: string,
    password: string,
}

export default function Register() {
    const {user, register} = useContext(AuthContext);
    const [mensagemError, setMensagemError] = useState('');
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(e: SyntheticEvent) {
        e.preventDefault();
        const data = {
            username: username,
            email: email,
            password: password,
          };
        const registerUser = await register(data);
        if(registerUser){
            setMensagemError(registerUser);
        }
    }
    
    if(user){
        return(
            <main>
                <div className={Style.Container_Favoritos}>
                    {<p style={{width: '1020px'}}  className={Style.mensagem_fim_da_linha}><center>Você já está logado, retorne para a página principal.</center></p>}
                </div>
            </main>
        )
    } else {     
        return (
            <div className={Style.Container}>
            <div className={Style.Container_Register}>
                <h1>Registrar Conta</h1>
                <form className={Style.form} onSubmit={handleRegister}>
                    {mensagemError && <center><span>{mensagemError}</span></center>}
                    <ul>
                        <li className={Style.li}><input onChange={(e) => setUsername(e.target.value)} className={Style.input} type="text" placeholder="Nome do usuário" /></li>
                        <li className={Style.li}><input onChange={(e) => setEmail(e.target.value)} className={Style.input} type="text" placeholder="E-mail" /></li>                           
                        <li className={Style.li}><input onChange={(e) => setPassword(e.target.value)} className={Style.input} type="password" placeholder="Senha" /></li>
                    </ul>
                    <div className={Style.footer}>
                        <button type="submit" className={Style.button}>CRIAR CONTA</button>
                    </div>
                </form>
            </div>
            <div className={Style.Image_Pokemon_Cartas} /> 
        </div>
        )
    }
}