import React, {memo} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface HeaderComponentProps {
  title: string;
}
export const HeaderComponent = (props: HeaderComponentProps) => {
  const {title} = props;

  return (
    <HeaderContainer>
      <HeaderText>{title}</HeaderText>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  height: ${44 + getStatusBarHeight()}px;
  padding-top: ${7 + getStatusBarHeight()}px;
  width: 100%;
  background-color: ${Colors.azure};
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  color: ${Colors.white};
  text-align: center;
`;
