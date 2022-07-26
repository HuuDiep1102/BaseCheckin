/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {IC_BASE_ME} from '@/assets';
import {navigateToMainNavigation} from '@/utils/navigation';

export const WelcomeScreen = () => {
  console.log('Welcome');
  return (
    <WelcomeScreenContainer>
      <HeaderConatiner>
        <LogoApp source={IC_BASE_ME} />
      </HeaderConatiner>
      <BannerContainer>
        <BannerText>Base Me</BannerText>
        <TitleText>
          {
            'Giải pháp quản lý công việc \n & dự án toàn diện cho doanh nghiệp 4.0'
          }
        </TitleText>
      </BannerContainer>
      <FooterContainer>
        <WarningText>Bạn chưa đăng nhập</WarningText>
        <WrapButton>
          <BtnLogin onPress={navigateToMainNavigation}>
            <BtnLoginText>ĐĂNG NHẬP THỦ CÔNG</BtnLoginText>
          </BtnLogin>
        </WrapButton>
      </FooterContainer>
    </WelcomeScreenContainer>
  );
};

const WelcomeScreenContainer = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

const HeaderConatiner = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const LogoApp = styled.Image`
  height: 160px;
  width: 141.21px;
`;

const BannerContainer = styled.View`
  flex: 1;
`;

const BannerText = styled.Text`
  font-weight: 700;
  font-size: 30px;
  line-height: 35.16px;
  text-align: center;
  padding-top: 39px;
  padding-bottom: 7px;
  color: ${Colors.azure};
`;

const TitleText = styled.Text`
  font-weight: 400;
  font-size: 15px;
  text-align: center;
`;

const FooterContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const WarningText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  padding-bottom: 29px;
  padding-top: 50px;
  color: ${Colors.oldSilver};
`;

const WrapButton = styled.View``;

const BtnLogin = styled.TouchableOpacity`
  height: 48px;
  width: 300px;
  background-color: ${Colors.white};
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border-width: 1px;
  border-color: ${Colors.azure};
`;

const BtnLoginText = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: ${Colors.azure};
`;
