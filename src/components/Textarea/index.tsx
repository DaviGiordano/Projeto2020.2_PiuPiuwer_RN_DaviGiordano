import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { Feather } from '@expo/vector-icons'
import Input from '../Input'
import { Container, TextareaComponent, ButtonText, ActionButton, ToggleTextarea, SendButton } from './styles';



const Textarea: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);
  
  const handleToggle = useCallback(()=>{
    setIsToggled(!isToggled);
  },[setIsToggled,isToggled]);

  return (
    <>
      <ToggleTextarea onPress={handleToggle}>
        {isToggled?
         <Feather name={'message-circle'} color={'yellow'} size={24}/>
        :<Feather name={'message-circle'} color={'black'} size={24}/>
        }
        <ButtonText>Escrever</ButtonText>
      </ToggleTextarea>
      {isToggled && (
        <Container>
        <TextareaComponent 
        placeholder={'O que você está ciscando hoje?'}
        multiline={true}
        numberOfLines={4}
        ></TextareaComponent>
  
        <SendButton>
          <Feather name={'send'} color={'white'} size={24}></Feather>
        </SendButton>
        </Container>
        
        
      )} 
    </>
);
}

export default Textarea;