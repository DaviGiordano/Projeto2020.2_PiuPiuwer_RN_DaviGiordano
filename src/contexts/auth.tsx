import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api';
import * as auth from '../services/auth';
import AsyncStorage from '@react-native-community/async-storage';
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
    useEffect(()=>{
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem(`@Project:user`);
            const storagedToken = await AsyncStorage.getItem(`@Project:token`);
            
            if(storagedUser && storagedToken){
            setUser(JSON.parse(storagedUser));
            setToken(storagedToken);
            }       
        }
        loadStorageData();
            
    },[]);
    /**FUNCTION SIGN IN */
    const signIn = useCallback(async (usernameInput:string, passwordInput:string)=>{
    
        
        const response = await auth.signIn(usernameInput,passwordInput);
        
        if(response === "preencha todos os campos") {
            console.log("preencha todos os campos");
            return ("preencha todos os campos");
        }
        else if(response === "usuário ou senha errado") {
            console.log("usuário ou senha incorreto")
            return ("usuário ou senha incorreto");
        }
        else {
            const userResponse = await api.get(`usuarios/?search=${usernameInput}`);
            //console.log(userResponse);
            const user = userResponse.data[0];

            setToken(response.data.token);
            setUser({first_name:user.first_name,
                    last_name:user.last_name,
                    id:user.id,
                    foto:user.foto,
                    username: user.username,
                    email: user.email,
                    sobre: user.sobre,
                    seguindo: user.seguindo
                });
            
            console.log("Sucesso ao efetuar login")

            await AsyncStorage.setItem(`@Project:token`, response.data.token);
            await AsyncStorage.setItem(`@Project:user`, JSON.stringify(user));
            
            return "Sucesso ao efetuar login";
            
        }

    },[]);
    /**FUNCTION SIGN OUT */
    const signOut = useCallback(async ()=>{
        await AsyncStorage.clear();
        setToken('');
        setUser({} as UserApi);
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