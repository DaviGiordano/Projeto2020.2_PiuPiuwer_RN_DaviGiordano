import React, { useCallback, useState } from "react";

import { Feather } from "@expo/vector-icons";

import {
  ActionButton,
  LikeCounter,
  PiuContainer,
  PiuFooter,
  PiuHeader,
  PiuMain,
  PiuText,
  ProfileImage,
  ProfileName,
} from "./styles";

interface PiuProps {
  profileImage?: string;
  profileName: string;
  piuText: string;
  isLiked: boolean;
  likeCount: number;
  isFavorited: boolean;
  isDeletable: boolean;
  handleDelete(): void;
  handleFavorite(): void;
  handleLike(): void;
}

const Piu: React.FC<PiuProps> = ({
  profileName,
  profileImage,
  piuText,
  isDeletable,
  isLiked,
  likeCount,
  isFavorited,
  handleDelete,
  handleFavorite,
  handleLike,
}) => {
  const [likedStatus, setLikedStatus] = useState(isLiked);
  const [favoritedStatus, setFavoritedStatus] = useState(isFavorited);

  const toggleLike = useCallback(() => {
    setLikedStatus(!likedStatus);
    handleLike();
  }, [setLikedStatus, likedStatus, handleLike]);

  const toggleFavorite = useCallback(() => {
    setFavoritedStatus(!favoritedStatus);
    handleFavorite();
  }, [setFavoritedStatus, favoritedStatus]);

  return (
    <PiuContainer>
      <PiuHeader>
        <ProfileImage source={{ uri: profileImage }} />
        <ProfileName>
          {` `}
          {profileName}
        </ProfileName>
      </PiuHeader>
      <PiuMain>
        <PiuText>{piuText}</PiuText>
      </PiuMain>
      <PiuFooter>
        <ActionButton
          onPress={() => {
            toggleLike();
          }}
        >
          {likedStatus ? (
            <Feather name="heart" color={"red"} size={24}></Feather>
          ) : (
            <Feather name="heart" color={"grey"} size={24}></Feather>
          )}
          <LikeCounter> {likeCount}</LikeCounter>
        </ActionButton>
        <ActionButton
          onPress={() => {
            toggleFavorite();
          }}
        >
          {favoritedStatus ? (
            <Feather name="star" color={"blue"} size={24}></Feather>
          ) : (
            <Feather name="star" color={"grey"} size={24}></Feather>
          )}
        </ActionButton>
        <ActionButton enabled={isDeletable} onPress={handleDelete}>
          {isDeletable && <Feather name="trash" size={24}></Feather>}
        </ActionButton>
      </PiuFooter>
    </PiuContainer>
  );
};

export default Piu;
