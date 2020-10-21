import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { PiuData, useAuth, UserApi } from '../../contexts/auth';
import { Feather } from '@expo/vector-icons'
import axios from 'axios';

import Piu from '../../components/Piu';
import Header from '../../components/Header';
import Textarea from '../../components/Textarea';

import { Container, LoadingPius, Scroll } from './styles';


const Feed: React.FC = () => {
    
    const { token, user } = useAuth(); 
    const [pius, setPius] = useState<Array<PiuData>>([]);
    const [loadingPius, setLoadingPius] = useState(true);

    const favoritedPiusIdsCallback = useCallback((pius: Array<PiuData>)=>{
        const favoritedPius = pius.filter(piu => {
        const usuariosQueFavoritaram = piu.favoritado_por.map((item: UserApi) => item.id);
        return usuariosQueFavoritaram.includes(user.id);
        })
        return favoritedPius.map(piu => piu.id)
    },[user,pius]);
    
    const favoritedPiusIds = useMemo(
        () => favoritedPiusIdsCallback(pius)
    ,[user, pius]);

    const likedPiusIds = useMemo(()=>{
        const likedPius = pius.filter(piu => {
            const usuariosQueDeramLike = piu.likers.map((item: UserApi) => item.id);
            return usuariosQueDeramLike.includes(user?.id);
        }) 
    
        return likedPius.map(piu => piu.id)
    },[user, pius]);

    const setSortedPius = useCallback((newPius: Array<PiuData>) => {
        const favoritedPiusIdsLocal = favoritedPiusIdsCallback(newPius);
        
        function compareFavorite(a: PiuData, b: PiuData){
            return (favoritedPiusIdsLocal.includes(b.id)? 1 : 0 ) - (favoritedPiusIdsLocal.includes(a.id)? 1 : 0);
        }
        //primeiro organizar por data
        newPius.sort((a,b) => Date.parse(b.horario) - Date.parse(a.horario));
        //depois organizar por favoritado
        newPius.sort(compareFavorite);
        //console.log(newPius)
        setPius(newPius);
        
    },[setPius,favoritedPiusIdsCallback,user]);

    const handleGetPius = useCallback(async () => {
        
        const response = await axios({
        url: 'http://piupiuwer.polijr.com.br/pius/',
        method: 'GET',
        headers: {
            Authorization: `JWT ${token}`
        }
        })

        if(response.data){
            //console.log(response.data);
            setSortedPius(response.data);
            setLoadingPius(false);
            
            console.log({pius: pius});
            //setSortedPius(response.data);
            //console.log(pius)
        }
    },[token,setSortedPius]);

    const sendPiu = useCallback( async (mensagemInput:string)=>{

        const response = await axios({
            url: 'http://piupiuwer.polijr.com.br/pius/',
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`
            },
            data: {
                usuario: user.id,
                texto: mensagemInput
            }
        })    
        console.log({piusantes: pius})
        setSortedPius([response.data, ...pius]);
        console.log({piusdepois: pius})
        /*ADIÇAO DIRETA DO PIU À LISTA */
        if(response.data){
            //console.log(pius);
        }
    },[user,token,pius,setSortedPius]);

    const delThisPiu = useCallback( async (piu: PiuData)=>{
        const piuId = piu.id
        console.log(piu.id);
        const response = await axios({
          url: `http://piupiuwer.polijr.com.br/pius/${piuId}`,
          method: 'DELETE',
          headers: {
            Authorization: `JWT ${token}`
          }
        })
        //7console.log(response);
        //console.log('Piu Deletado');
        handleGetPius();
    },[token,handleGetPius]);

    useEffect(()=>{
        if(!!token){
            handleGetPius();
            //console.log(favoritedPiusIds);
        }
    },[token]);

    

    const pinThisPiu = useCallback( async (item:PiuData) => {
        const userId = user.id
        const piuId = item.id
        
        const newPius = pius.map( piu =>{
        //  não consigo comparar objetos, então comparo suas keys (ids)
          const favoritadosIds = piu.favoritado_por.map(user => user.id);
          
          //estrutura ternária sensacional
          return piu.id === item.id 
            ? {
              ...piu,
              favoritado_por: favoritadosIds.includes(user.id) 
                ? piu.favoritado_por.filter(item => item.id != user.id) 
                : [ ...piu.favoritado_por, user ]  
            }
            : piu;
    
        });
        //console.log(newPius);
        setSortedPius(newPius);
        const response = await axios({
          url: 'http://piupiuwer.polijr.com.br/pius/favoritar/',
          method: 'POST',
          headers: {
              Authorization: `JWT ${token}`
          },
          data: {
            usuario: userId,
            piu: piuId
          }
        })
        //handleGetPius();
      }, [token, user,pius,setSortedPius]);

    const likeThisPiu = useCallback( async (item:PiuData) => {
        const userId = user.id
        const piuId = item.id
        
        const newPius = pius.map( piu =>{
          const likersIds = piu.likers.map(user => user.id);
    
          return piu.id === item.id
          ? {
            ...piu,
            likers: likersIds.includes(user.id)
            ?  piu.likers.filter(item => item.id != user.id)
            :  [ ...piu.likers, user]
          }
          : piu;
    
          
        });
          setSortedPius(newPius);
        
        const response = await axios({
          url: 'http://piupiuwer.polijr.com.br/pius/dar-like/',
          method: 'POST',
          headers: {
              Authorization: `JWT ${token}`
          },
          data: {
            usuario: userId,
            piu: piuId
          }
        })
      }, [token, user,pius,setSortedPius]);

    const renderPius = useCallback(()=>{
        return pius.map((item) =>{
          return (
            <Piu
              key={item.id}
              profileName={item.usuario.first_name + " "+ item.usuario.last_name}
              profileImage={item.usuario.foto}
              piuText={item.texto}
              isFavorited={favoritedPiusIds.includes(item.id)}
              isLiked={likedPiusIds.includes(item.id)}
              likeCount={item.likers.length}
              isDeletable={item.usuario.id == user.id}
              //likeCount={item.likers.length}
              //isFollowing={piusByFollowedUsersIds.includes(item.id)}
              handleFavorite={
                ()=>{pinThisPiu(item)}           
              }
              handleDelete={
                ()=>{delThisPiu(item)}
              }
              handleLike={
                () => {likeThisPiu(item)}
              }
            //   handleFollow={
            //     () => {followThisUser(item)}
            //   }
            />
          );
        })
      }, [pinThisPiu,delThisPiu,pius,likedPiusIds,user,favoritedPiusIds]);
      
    return (
        <Container>
            <Header ></Header>
            <Scroll showsVerticalScrollIndicator={false}>
            <Textarea handleSendPiu={sendPiu}/>
                {loadingPius?
                <LoadingPius>
                  <Feather name='loader' size={30} />
                </LoadingPius>
                : renderPius()}
            </Scroll>
            
        </Container>
    );
}

export default Feed;