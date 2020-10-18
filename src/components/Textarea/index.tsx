import React from 'react';
import { View } from 'react-native';

import Input from '../Input'
import { Container, TextareaComponent, Button } from './styles';

const Textarea: React.FC = () => {
  return (
      <Container>
      <TextareaComponent 
      placeholder={'O que você está ciscando hoje?'}
      multiline={true}
      numberOfLines={4}
      ></TextareaComponent>
    <Button></Button>
      </Container>
  );
}

export default Textarea;