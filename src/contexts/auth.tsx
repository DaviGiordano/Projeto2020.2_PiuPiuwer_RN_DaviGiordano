import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api';
import * as auth from '../services/auth';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
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
    signIn(usernameInput:string, passwordInput:string): Promise<void>;
    signOut(): void;
}

interface Errors {
    [key: string]: string;
}


export default function getValidationErrors(error: ValidationError): Errors {
    const validationErrors: Errors = {};

    error.inner.forEach(error => {
        validationErrors[error.path] = error.message;
    });

    return validationErrors;
	}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {

    const [user, setUser] = useState<UserApi>({} as UserApi);
    const [token, setToken] = useState<string>('');

    /**USE EFFECT -> LOAD STORAGE DATA */
    useEffect(()=>{
        async function loadStorageData() {
            //const storagedUser = await AsyncStorage.getItem(`@Project:user`);
            //const storagedToken = await AsyncStorage.getItem(`@Project:token`);
            const storagedItems = await AsyncStorage.multiGet([`@Project:user`,`@Project:token`]);
            if(storagedItems[0][1] && storagedItems[1][1]){
            setUser(JSON.parse(storagedItems[0][1]));
            setToken(storagedItems[1][1]);
            }       
        }
        loadStorageData();
            
    },[]);
    /**FUNCTION SIGN IN */
    const signIn = useCallback(async (usernameInput:string, passwordInput:string)=>{

        const dataToApi = {usuario: usernameInput, senha: passwordInput}
        
        try {
            const loginShape = Yup.object().shape({
                usuario: Yup.string().required('Usuário obrigatório'),
                senha: Yup.string().required('Senha obrigatória'),
            });
            console.log({user: usernameInput,senha:passwordInput})
    
            await loginShape.validate(dataToApi, {abortEarly: false});
            const response = await auth.signIn(usernameInput,passwordInput);    
            
            if(response){
                const userResponse = await api.get(`usuarios/?search=${usernameInput}`);
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
                
    
                await AsyncStorage.multiSet([[`@Project:token`, response.data.token],[`@Project:user`, JSON.stringify(user) ]])
    
            }
            
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                if(!usernameInput){
                    alert(errors.usuario)
                }else if(!passwordInput){
                    alert(errors.senha)
                }else{
                    console.log(err)
                }
            }
            
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