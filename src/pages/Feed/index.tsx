import React, { useCallback } from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native'

import { Container } from './styles';

const Feed: React.FC = () => {

    const { navigate } = useNavigation();

    const handleSignOut = useCallback(() => {
        navigate('Login');
     }, [navigate]);

    return (
        <Container>
            <Text onPress={handleSignOut}>FeedPage</Text>
        </Container>
    );
}

export default Feed;