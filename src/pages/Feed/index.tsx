import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { Container, Scroll } from './styles';
import Piu from '../../components/Piu';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import Textarea from '../../components/Textarea';
import { PiuData, useAuth, UserApi } from '../../contexts/auth';
import axios from 'axios';

const Feed: React.FC = () => {
    
    const { token, user } = useAuth(); 
    const { navigate } = useNavigation();
    const [pius, setPius] = useState<Array<PiuData>>([]);

    const handleGetPius = useCallback(async () => {
        const response = await axios({
        url: 'http://piupiuwer.polijr.com.br/pius/',
        method: 'GET',
        headers: {
            Authorization: `JWT ${token}`
        }
        })
        if(response.data){
            console.log(response.data);
            setSortedPius(response.data);
        }
    },[token]);

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
        
        setPius(newPius);
    },[setPius,favoritedPiusIdsCallback,user]);

    useEffect(()=>{
        if(!!token){
            handleGetPius();
            console.log(favoritedPiusIds);
        }
    },[token]);

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
              isDeletable={item.usuario.id == user.id}
              //likeCount={item.likers.length}
              //isFollowing={piusByFollowedUsersIds.includes(item.id)}
            //   handlePin={
            //     ()=>{pinThisPiu(item)}           
            //   }
            //   handleDel={
            //     ()=>{delThisPiu(item)}
            //   }
            //   handleLike={
            //     () => {likeThisPiu(item)}
            //   }
            //   handleFollow={
            //     () => {followThisUser(item)}
            //   }
            />
          );
        })
      }, [/*pinThisPiu,delThisPiu,*/pius,likedPiusIds,user]);
      
    return (
        <Container>
            <Header ></Header>
            <Scroll showsVerticalScrollIndicator={false}>
            <Textarea/>
                {renderPius()}
            </Scroll>
            
        </Container>
    );
}

export default Feed;