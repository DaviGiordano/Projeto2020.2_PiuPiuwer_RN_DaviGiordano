import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const PiuContainer = styled.View`
  width: 100%;
  height: 200px;
  margin-bottom: 30px;
  flex-direction: column;
  background-color: #fff;
  border-width: 1px;
  border-color: #e6e6f0;
`;

export const PiuHeader = styled.View`
  flex: 1;
  border-bottom-width: 1px;
  border-color: #e6e6f0;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

export const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;

  background-color: #eee;
`;

export const ProfileName = styled.Text`
  font-family: Quicksand_400Regular;
  text-align: center;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProfileUsername = styled.Text`
  text-align: center;
  flex: 0;
  font-family: Quicksand_400Regular;
  font-size: 10px;
`;

export const PiuMain = styled.View`
  width: 100%;
  flex: 2;
  padding-left: 5px;
  padding-right: 5px;
  background-color: white;
`;

export const PiuText = styled.Text`
  font-family: Quicksand_400Regular;
  font-size: 16px;
`;

export const PiuFooter = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: blue;
  background-color: #e6e6f0;
`;

export const ActionButton = styled(RectButton)`
  width: 50px;
  height: 40px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const LikeCounter = styled.Text`
  font-family: Quicksand_400Regular;
  font-size: 12px;
  color: red;
`;
