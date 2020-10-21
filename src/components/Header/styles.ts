import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const HeaderContainer = styled.View`
  width: 100%;
  height: 70px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #e6e6f0;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 4px;
`;

export const Icon = styled.Image`
  margin-left: 10px;
  width: 40px;
  height: 40px;
`;

export const Title = styled.Text`
  font-family: Quicksand_600SemiBold;
  margin-bottom: 5px;
  font-size: 20px;
  color: #003f88;
`;

export const ActionButton = styled(RectButton)`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
