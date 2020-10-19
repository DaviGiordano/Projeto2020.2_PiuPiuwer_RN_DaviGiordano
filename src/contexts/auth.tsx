import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

export interface UserApi{
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    sobre: string;
    foto: string;
    seguindo:Array<{id:number,username:string}>

}

export interface PiuData{
    id: number;
    usuario: UserApi;
    likers: Array<UserApi>;
    favoritado_por: Array<UserApi>;
    texto: string;
    horario: string;
}

export interface Following{
    id:number,
    username:string
}

export interface AuthContextData {
    user: UserApi;
    token: string;
    signIn(usernameInput:string, passwordInput:string): Promise<string>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    
    const [user, setUser] = useState<UserApi>({} as UserApi);
    const [token, setToken] = useState<string>('');


    /**USE EFFECT -> LOAD STORAGE DATA */

    /**FUNCTION SIGN IN */
    const signIn = useCallback(async (usernameInput:string, passwordInput:string)=>{
        await
        console.log('signed in');
        setToken('response.data.token');
        setUser({
            first_name:'user.first_name',
            last_name:'user.last_name',
            id:2324,
            foto:'user.foto',
            username: 'user.username',
            email: 'user.email',
            sobre: 'user.sobre',
            seguindo: [{ id:123123, username:'user.seguindo'},{ id:123123, username:'user.seguindo'}]
        });
        return('');
    },[]);
    /**FUNCTION SIGN OUT */
    const signOut = useCallback(()=>{
        
    },[]);
    return(
        <AuthContext.Provider value={{ token, user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    
    const context = useContext(AuthContext);
    return context;
}