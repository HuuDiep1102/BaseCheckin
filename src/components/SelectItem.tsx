import React, {memo, useState} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import 'react-native-gesture-handler';

interface SelectItemProps {
  title: string;
  icon: any;
  clientCheckin?: string;
  onPress: () => void;
  keyName: string;
  active: boolean | undefined;
}
export const SelectItem = memo((props: SelectItemProps) => {
  const {title, icon, clientCheckin, onPress, active, keyName} = props;

  // const [isActive, setActive] = useState(false);

  return (
    <Container>
      <ItemContainer onPress={onPress}>
        <Icon source={icon} />
        <TextContainer>
          <TitleText>{title}</TitleText>
          {clientCheckin && <DevicesText>{clientCheckin}</DevicesText>}
        </TextContainer>
        <ActiveText isActive={active}>
          {active ? 'Enable' : 'Disable'}
        </ActiveText>
      </ItemContainer>
    </Container>
  );
});

const Container = styled.View``;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 64px;
  border-bottom-color: ${Colors.gray2};
  border-bottom-width: 0.5px;
  margin-left: 16px;
`;

const Icon = styled.Image`
  width: 28px;
  height: 28px;
`;

const TextContainer = styled.View`
  height: 64px;
  justify-content: center;
  align-items: flex-start;
  padding-left: 16px;
`;

const TitleText = styled.Text`
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${Colors.black};
`;

const DevicesText = styled.Text`
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
  color: ${Colors.oldSilver};
  padding-top: 4px;
`;

const ActiveText = styled.Text<{
  isActive: boolean | undefined;
}>`
  position: absolute;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  right: 16px;
  color: ${p => (p.isActive ? Colors.green2 : Colors.oldSilver)};
`;
