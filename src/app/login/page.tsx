"use client"
import { SyntheticEvent, useContext, useState } from "react";
import Style from "./page.module.css";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from 'next/navigation'

type formData = {
    email: string;
    password: string;
}
 
export default function Login() {
    const [mensagemError, setMensagemError] = useState('');
    const {user, signIn} = useContext(AuthContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    async function handleSignIn(e: SyntheticEvent) {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
          };
        const login = await signIn(data);
        if(login){
            setMensagemError('Usuário ou senha inválidos');
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
                <div className={Style.Container_Login}>
                    <h1>Login</h1>
                    <form className={Style.form} onSubmit={handleSignIn}>
                        {mensagemError && <center><span>{mensagemError}</span></center>}
                        <ul>
                            <li className={Style.li}><input onChange={(e) => setEmail(e.target.value)} className={Style.input} type="text" placeholder="E-mail" /></li>
                            <li className={Style.li}><input onChange={(e) => setPassword(e.target.value)} className={Style.input} type="password" placeholder="Senha" /></li>
                        </ul>
                        <div className={Style.footer}>
                        <a href="./login/register"><p className={Style.p}>Não tem uma conta? Clique aqui</p></a>
                            <button type="submit" className={Style.button}>ENTRAR</button>
                        </div>
                    </form>
                </div>
                <div className={Style.Image_Pokemon_Cartas} /> 
            </div>
        )
    }

}