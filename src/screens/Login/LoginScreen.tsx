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
import {IC_BASE_ME, IC_EMAIL, IC_LOCK, IMG_BANNER} from '@/assets';
import {navigateToHistoryScreen} from '@/utils/navigation';

export const LoginScreen = () => {
  return (
    <Container>
      <HeaderConatiner>
        <LogoApp source={IC_BASE_ME} />
      </HeaderConatiner>
      <SectionContainer>
        <BannerImage resizeMode={'contain'} source={IMG_BANNER} />
        <LoginInputContainer>
          <EmailInputContainer>
            <Logo source={IC_EMAIL} />
            <Input
              placeholder="Email"
              placeholderTextColor={Colors.oldSilver}></Input>
          </EmailInputContainer>
          <PassWordInputContainer>
            <Logo source={IC_LOCK} />
            <Input
              placeholder="Mật khẩu"
              placeholderTextColor={Colors.oldSilver}></Input>
          </PassWordInputContainer>
          <ForgotPassWordContainer>
            <ForgotPassWordText>Quên mật khẩu?</ForgotPassWordText>
          </ForgotPassWordContainer>
        </LoginInputContainer>
        <FooterContainer>
          <WrapButton>
            <BtnLogin onPress={navigateToHistoryScreen}>
              <BtnLoginText>ĐĂNG NHẬP</BtnLoginText>
            </BtnLogin>
          </WrapButton>
        </FooterContainer>
      </SectionContainer>
    </Container>
  );
};
const BannerImage = styled.Image`
  position: absolute;
  height: 456.93px;
  width: 375px;
  bottom: 0;
  opacity: 0.2;
  z-index: -1;
`;

const Container = styled.View`
  flex: 1;
`;

const SectionContainer = styled.View`
  flex: 2;
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

const LoginInputContainer = styled.View`
  padding-top: 20px;
  flex: 1;
  //background-color: yellow;
  justify-content: center;
  align-items: center;
`;

const EmailInputContainer = styled.View`
  height: 40px;
  width: 80%;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${Colors.gray};
  flex-direction: row;
`;

const Logo = styled.Image`
  height: 20px;
  width: 20px;
  align-self: center;
  padding-right: 12px;
`;

const Input = styled.TextInput`
  width: 80%;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  color: ${Colors.oldSilver};
  padding-left: 12px;
`;

const PassWordInputContainer = styled.View`
  height: 40px;
  width: 80%;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${Colors.gray};
  flex-direction: row;
  margin-top: 40px;
`;

const ForgotPassWordContainer = styled.TouchableOpacity`
  height: 64px;
  width: 77%;
  padding-top: 25px;
  align-items: flex-end;
`;
const ForgotPassWordText = styled.Text`
  height: 64px;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  text-decoration-line: underline;
  color: ${Colors.oldSilver};
  text-align: center;
`;

const FooterContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const WrapButton = styled.View`
  padding-bottom: 35px;
`;

const BtnLogin = styled.TouchableOpacity`
  height: 48px;
  width: 300px;
  background-color: ${Colors.azure};
  justify-content: center;
  align-items: center;
  border-radius: 34px;
  border-width: 1px;
  border-color: ${Colors.azure};
`;

const BtnLoginText = styled.Text`
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: ${Colors.white};
`;
