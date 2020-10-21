import React, { useCallback } from "react";
import { View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { HeaderContainer, Icon, Title } from "./styles";
import { ActionButton } from "../Piu/styles";

import Logo from "../../assets/images/icons/logo.png";
import { useAuth } from "../../contexts/auth";

const Header: React.FC = () => {
  const { signOut } = useAuth();

  const handleLogOut = useCallback(() => {
    signOut();
    //logOut();
  }, [signOut]);

  return (
    <HeaderContainer>
      <Icon resizeMode="contain" source={Logo}></Icon>
      <Title>PiuPiuwer</Title>

      <ActionButton onPress={handleLogOut}>
        <Feather name={"log-out"} size={24} />
      </ActionButton>
    </HeaderContainer>
  );
};

export default Header;
