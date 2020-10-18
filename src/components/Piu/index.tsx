import React from 'react';
import { View } from 'react-native';

import { PiuContainer, PiuFooter, PiuHeader, PiuMain, PiuText, ProfileImage, ProfileName, ProfileUsername } from './styles';

interface PiuProps{
    profileImage?:string;
    profileName:string;
    profileUsername:string;
    piuText:string;
    isLiked:boolean;
    isPinned:boolean;
    isDeletable:boolean;
}

const Piu: React.FC<PiuProps> = ({
        profileName,
        profileUsername,
        profileImage,
        piuText,
        isDeletable,
        isLiked,
        isPinned
    }) => {

  return (
    <PiuContainer>
        <PiuHeader >
            <ProfileImage source={{uri: profileImage}}/>
            <ProfileName>
                {` `}{profileName}{` `}
                <ProfileUsername>
                    {profileUsername}
                </ProfileUsername>
            </ProfileName>
            
        </PiuHeader>
        <PiuMain>
            <PiuText >
                {piuText}
            </PiuText>
        </PiuMain>
        <PiuFooter>

        </PiuFooter>
    </PiuContainer>
  );
}

export default Piu;