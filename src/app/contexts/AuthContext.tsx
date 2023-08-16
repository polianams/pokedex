"use client"
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation'

type User = {
    id: number;
    name: string;
    email: string;
}

type SignInData = {
    email: string;
    password: string;
}

type ResgisterData = {
    username: string;
    email: string;
    password: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null | undefined;
    favList: PokeData[];
    register: (data: ResgisterData) => Promise<string>;
    signIn: (data: SignInData) => Promise<void> | Promise<string>;
    signOut: () => Promise<void>;
    getFav: (id: number) => void;
}

type PokeData = {
    id: number,
    name: string,
    url: string,
    userId: number
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }:any) {
    const [favList, setFavList] = useState <PokeData[]>([]);
    const [user, setUser] = useState<User | null | undefined>(null);
    const router = useRouter();
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'poke-token': token } = parseCookies();
        const verifyToken = async () => {
            const response = await fetch("http://localhost:3000/api/auth", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                getFav(data.id); 
            } else {
                setUser(undefined);  
                setFavList([]);
            }

        }
        verifyToken();
    },[]);


    useEffect(()=> {
        if(user !== null && user !== undefined){
            getFav(user.id); 
        }
    }, [user])


    async function signIn(data: SignInData) {
        const userData = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        });

        if(!userData.ok) {
            const error = await userData.json();
            return (error.message);
        }
        
        const userT = await userData.json();
        
        setCookie(undefined, "poke-token", userT.token, {
            maxAge: 60 * 60 * 1, // 1 hora de armazenamento de cookie
        });

        setUser(userT.user);
        getFav(userT.user.id);
        router.push('/');
    }


    async function register(data: ResgisterData) {
        const userData = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.username,
                email: data.email,
                password: data.password,
            }),
        });

        if(!userData.ok) {
            const error = await userData.json();
            return (error.message);
        }
        const userT = await userData.json();
        signIn(data);
    }

    async function signOut() {
        destroyCookie(undefined, "poke-token");
        setUser(undefined);   
        setFavList([]);
        router.push('/');     
    }


    async function getFav(id: number){
            const res = await fetch(`http://localhost:3000/api/favorites?user=${id}`, {
                headers: {
                  'method': 'GET',
                  'Content-Type': 'application/json',
                },
              });
              if(res.ok){
                const data = await res.json();
                setFavList(data);
            } 
    } 

    return (
        <AuthContext.Provider value={{user, favList, isAuthenticated, signIn, register, signOut, getFav}}>
            {children}
        </AuthContext.Provider>
    );
}