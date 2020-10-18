import React, { useCallback } from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native'

import { Container, Scroll } from './styles';
import Piu from '../../components/Piu';
import { ScrollView } from 'react-native-gesture-handler';

const Feed: React.FC = () => {

    const { navigate } = useNavigation();

    const handleSignOut = useCallback(() => {
        navigate('Login');
     }, [navigate]);

    return (
        <Container>
            <Text onPress={handleSignOut}>FeedPage</Text>
            <Scroll showsVerticalScrollIndicator={false}>
            <Piu
                profileName='Davi'
                profileUsername='@davi9854'
                piuText='lallalalalalalalalallalalalalala'
                isLiked={false}
                isFavorited={false}
                isDeletable={false}
            />
            <Piu
                profileName='Davi'
                profileUsername='@davi9854'
                piuText='lallalalalalalalalallalalalalala'
                isLiked={true}
                isFavorited={false}
                isDeletable={false}
            />
            <Piu
                profileName='Davi'
                profileUsername='@davi9854'
                piuText='lallalalalalalalalallalalalalala'
                isLiked={true}
                isFavorited={false}
                isDeletable={true}
            />
            <Piu
                profileName='Davi'
                profileUsername='@davi9854'
                piuText='lallalalalalalalalallalalalalala'
                isLiked={true}
                isFavorited={false}
                isDeletable={true}
            />
            <Piu
                profileName='Davi'
                profileUsername='@davi9854'
                piuText='lallalalalalalalalallalalalalala'
                isLiked={true}
                isFavorited={false}
                isDeletable={true}
            />
            <Piu
                profileName='Davi'
                profileUsername='@davi9854'
                piuText='lallalalalalalalalallalalalalala'
                isLiked={true}
                isFavorited={false}
                isDeletable={true}
            />
            
            
            </Scroll>
            
        </Container>
    );
}

export default Feed;